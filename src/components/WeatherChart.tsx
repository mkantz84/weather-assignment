"use client";

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
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="min" stroke="#8884d8" name="Min Temp" />
        <Line type="monotone" dataKey="max" stroke="#82ca9d" name="Max Temp" />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
