import React from "react";
import { render } from "@testing-library/react";
import WeatherChart, { WeatherChartData } from "./WeatherChart";
import { describe, it, expect, vi } from "vitest";

// Optionally mock Recharts for jsdom compatibility
vi.mock("recharts", async (importOriginal: any) => {
  const actual = await importOriginal();
  return {
    ...actual,
    ResponsiveContainer: ({ children }: any) => (
      <div className="recharts-responsive-container">{children}</div>
    ),
    LineChart: ({ children }: any) => <svg>{children}</svg>,
    Line: () => <line />,
    XAxis: () => <g />,
    YAxis: () => <g />,
    CartesianGrid: () => <g />,
    Tooltip: () => <g />,
    Legend: () => <g />,
    Brush: () => <g />,
  };
});

const mockData: WeatherChartData[] = [
  { date: "2024-07-01", min: 10, max: 20 },
  { date: "2024-07-02", min: 15, max: 25 },
];

describe("WeatherChart (Vitest)", () => {
  it("renders the chart container", () => {
    const { container } = render(<WeatherChart data={mockData} />);
    expect(
      container.querySelector(".recharts-responsive-container")
    ).toBeInTheDocument();
  });
});
