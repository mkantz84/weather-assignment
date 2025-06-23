"use client";
import { useEffect, useState } from "react";
import WeatherChart, { WeatherChartData } from "./WeatherChart";
import { fetchWeatherData } from "../network/weatherApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { debounce } from "../utils/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { usePersistedState } from "../hooks/usePersistedState";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useQuerySync } from "../hooks/useQuerySync";

function getDefaultDates() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 29); // last 30 days
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function formatDate(date: string | Date) {
  if (typeof date === "string") return date;
  return date?.toISOString()?.slice(0, 10);
}

function parseDate(str: string | null): Date | null {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

const LOCAL_STORAGE_KEY = "weather-dates";
const LOCAL_STORAGE_CITY_KEY = "weather-city";

export default function Weather() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaults = getDefaultDates();
  // Persisted state for city, start, and end (all as strings)
  const [cityInput, setCityInput] = usePersistedState<string>(
    LOCAL_STORAGE_CITY_KEY,
    "Berlin"
  );
  const [start, setStart] = usePersistedState<string>(
    `${LOCAL_STORAGE_KEY}-start`,
    defaults.start
  );
  const [end, setEnd] = usePersistedState<string>(
    `${LOCAL_STORAGE_KEY}-end`,
    defaults.end
  );

  // Debounced city for API fetch
  const city = useDebouncedValue(cityInput, 1000);

  // Sync with URL
  useQuerySync({
    city: cityInput,
    start,
    end,
  });

  const [data, setData] = useState<WeatherChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const json = await fetchWeatherData(city, start, end);
        setData(json);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city, start, end]);

  return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-8">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      <form
        className="flex flex-col gap-4 items-start mb-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Enter city name"
          />
        </div>
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <DatePicker
              selected={parseDate(start) || undefined}
              onChange={(date: Date | null) =>
                date && setStart(formatDate(date))
              }
              selectsStart
              startDate={parseDate(start) || undefined}
              endDate={parseDate(end) || undefined}
              maxDate={parseDate(end) || undefined}
              dateFormat="yyyy-MM-dd"
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <DatePicker
              selected={parseDate(end) || undefined}
              onChange={(date: Date | null) => date && setEnd(formatDate(date))}
              selectsEnd
              startDate={parseDate(start) || undefined}
              endDate={parseDate(end) || undefined}
              minDate={parseDate(start) || undefined}
              maxDate={parseDate(defaults.end) || undefined}
              dateFormat="yyyy-MM-dd"
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <WeatherChart data={data} />
      )}
    </div>
  );
}
