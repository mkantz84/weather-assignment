export async function fetchWeatherData(
  city: string,
  start: string,
  end: string
) {
  const res = await fetch(
    `/api/weather?city=${encodeURIComponent(city)}&start=${start}&end=${end}`
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
