// components/GraphicResource.jsx
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'OVA', uv: 400, Recursos: 240, amt: 240 },
  { name: 'FORO', uv: 300, Recursos: 139, amt: 221 },
  { name: 'VIDEO', uv: 200, Recursos: 980, amt: 229 },
  { name: 'INFOGRAFIA', uv: 278, Recursos: 390, amt: 200 },
  { name: 'QUICES', uv: 189, Recursos: 480, amt: 218 },
  { name: 'OTROS', uv: 239, Recursos: 380, amt: 250 },
];

export default class BarChartExample extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Recursos" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
    