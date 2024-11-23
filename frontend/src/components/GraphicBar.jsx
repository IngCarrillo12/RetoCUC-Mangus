import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export const GraphicBar = () => {
  const data = [
    { name: "January", uv: 400 },
    { name: "February", uv: 300 },
    { name: "March", uv: 500 },
    { name: "February", uv: 300 },
    { name: "March", uv: 500 },
  ];

  return (
    <BarChart width={400} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  );
};

