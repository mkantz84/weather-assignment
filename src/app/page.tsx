"use client";
import React, { Suspense } from "react";
import Weather from "../components/Weather";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Weather />
    </Suspense>
  );
}
