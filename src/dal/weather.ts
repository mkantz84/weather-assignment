import { getDb } from "./db";

export type DailyMinMax = {
  date: string;
  min: number;
  max: number;
};

// Weather-related DB call: Fetch daily min/max temperatures for a city and date range
// Returns an array of { date, min, max }
export async function getDailyMinMaxTemperatures(
  city: string,
  startDate: string,
  endDate: string
): Promise<DailyMinMax[]> {
  const db = await getDb();
  // SQLite date format: YYYY-MM-DD
  const rows = await db.all<DailyMinMax[]>(
    `SELECT 
      substr(time, 1, 10) as date,
      MIN(temperature) as min,
      MAX(temperature) as max
    FROM temperature_hourly
    WHERE city = ?
      AND date(time) BETWEEN date(?) AND date(?)
    GROUP BY date
    ORDER BY date ASC;`,
    [city, startDate, endDate]
  );
  return rows;
}
