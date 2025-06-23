import { GET } from "./route";
import * as weatherDal from "@/dal/weather";
import { NextRequest } from "next/server";

jest.mock("@/dal/weather");

function makeRequest(url: string) {
  // NextRequest expects a full URL
  return new NextRequest(url);
}

describe("GET /api/weather", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns weather data for valid params", async () => {
    (weatherDal.getDailyMinMaxTemperatures as jest.Mock).mockResolvedValue([
      { date: "2024-07-01", min: 10, max: 20 },
    ]);
    const req = makeRequest(
      "http://localhost/api/weather?city=Berlin&start=2024-07-01&end=2024-07-02"
    );
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual([{ date: "2024-07-01", min: 10, max: 20 }]);
    expect(weatherDal.getDailyMinMaxTemperatures).toHaveBeenCalledWith(
      "Berlin",
      "2024-07-01",
      "2024-07-02"
    );
  });

  it("returns 400 if start or end is missing", async () => {
    const req = makeRequest(
      "http://localhost/api/weather?city=Berlin&start=2024-07-01"
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/Missing start or end/);
  });

  it("returns 500 if DAL throws", async () => {
    (weatherDal.getDailyMinMaxTemperatures as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );
    const req = makeRequest(
      "http://localhost/api/weather?city=Berlin&start=2024-07-01&end=2024-07-02"
    );
    const res = await GET(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/DB error/);
  });
});
