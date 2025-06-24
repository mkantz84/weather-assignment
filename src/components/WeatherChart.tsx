"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  Label,
} from "recharts";

export type WeatherChartData = {
  date: string;
  min: number;
  max: number;
};

type WeatherChartProps = {
  data: WeatherChartData[];
};

export default function WeatherChart({ data }: WeatherChartProps) {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 40, left: 20, bottom: 70 }}
      >
        <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          angle={-30}
          textAnchor="end"
          height={60}
        >
          <Label
            value="Date"
            offset={40}
            position="bottom"
            style={{ fontSize: 16, fill: "#555" }}
          />
        </XAxis>
        <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]}>
          <Label
            value="Temperature (°C)"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle", fontSize: 16, fill: "#555" }}
          />
        </YAxis>
        <Tooltip
          contentStyle={{ fontSize: 14, borderRadius: 8 }}
          labelStyle={{ fontWeight: "bold" }}
        />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ fontSize: 14, paddingBottom: 10 }}
        />
        <Line
          type="monotone"
          dataKey="min"
          stroke="#1976d2"
          name="Min Temp"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="max"
          stroke="#d32f2f"
          name="Max Temp"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
        <Brush dataKey="date" height={30} stroke="#1976d2" travellerWidth={8} />
      </LineChart>
    </ResponsiveContainer>
  );
}
