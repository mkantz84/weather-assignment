import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import { getDailyMinMaxTemperatures, DailyMinMax } from "./weather";

// Helper to create an in-memory DB and seed it
async function setupTestDb() {
  const db: Database = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });
  await db.exec(`
    CREATE TABLE temperature_hourly (
      city TEXT,
      time TEXT,
      temperature REAL
    );
  `);
  // Seed with some data
  await db.exec(`
    INSERT INTO temperature_hourly (city, time, temperature) VALUES
      ('Berlin', '2024-07-01T01:00:00', 10),
      ('Berlin', '2024-07-01T12:00:00', 20),
      ('Berlin', '2024-07-02T01:00:00', 15),
      ('Berlin', '2024-07-02T12:00:00', 25),
      ('Paris', '2024-07-01T01:00:00', 5);
  `);
  return db;
}

describe("getDailyMinMaxTemperatures", () => {
  let origGetDb: any;
  beforeAll(() => {
    origGetDb = jest.requireActual("./db").getDb;
  });
  afterAll(() => {
    jest.resetModules();
  });

  it("returns correct min/max for each day and city", async () => {
    const db = await setupTestDb();
    jest.spyOn(require("./db"), "getDb").mockResolvedValue(db);
    const result = await getDailyMinMaxTemperatures(
      "Berlin",
      "2024-07-01",
      "2024-07-02"
    );
    expect(result).toEqual<DailyMinMax[]>([
      { date: "2024-07-01", min: 10, max: 20 },
      { date: "2024-07-02", min: 15, max: 25 },
    ]);
  });

  it("returns empty array if no data for city", async () => {
    const db = await setupTestDb();
    jest.spyOn(require("./db"), "getDb").mockResolvedValue(db);
    const result = await getDailyMinMaxTemperatures(
      "London",
      "2024-07-01",
      "2024-07-02"
    );
    expect(result).toEqual([]);
  });

  it("returns empty array if no data in range", async () => {
    const db = await setupTestDb();
    jest.spyOn(require("./db"), "getDb").mockResolvedValue(db);
    const result = await getDailyMinMaxTemperatures(
      "Berlin",
      "2024-06-01",
      "2024-06-02"
    );
    expect(result).toEqual([]);
  });
});
