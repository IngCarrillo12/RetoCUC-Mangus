import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

export const GraphicTort= () => {
  const data = [
    { name: "Completed", value: 65 },
    { name: "Pending", value: 25 },
    { name: "Failed", value: 10 },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};


