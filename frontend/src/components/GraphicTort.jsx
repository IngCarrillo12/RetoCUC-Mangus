import React from "react";
import "../style/graphicTort.css";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

export const GraphicTort = ({ courses }) => {
  // Calcular los porcentajes de cada estado
  const totalCourses = courses.length;
  const statusCounts = courses.reduce(
    (acc, course) => {
      acc[course.estado] = (acc[course.estado] || 0) + 1;
      return acc;
    },
    { borrador: 0, creado: 0, correcciones: 0, confirmado: 0 }
  );

  const data = Object.keys(statusCounts).map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: parseFloat(((statusCounts[status] / totalCourses) * 100).toFixed(2)),
  }));

  const filteredData = data.filter((entry) => entry.value > 0);

  const COLORS = ["#8884d8", "#8dd1e1", "#ffc658", "#a4de6c"];

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={filteredData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={140}
          fill="#82ca9d"
        >
          {/* Asignar colores dinámicos a cada segmento */}
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconSize={10} // Tamaño pequeño para los iconos
          formatter={(value) => (
            <span style={{ fontSize: "14px" }}>{value}</span>
          )}
        />
      </PieChart>
    </>
  );
};
