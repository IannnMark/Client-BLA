import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ProductSalesChart({ data }) {
  const pieColors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  const chartSize = 300; // Set the size of the pie chart

  const labelStyle = {
    fontSize: "10px",
    fill: "white",
  };

  const legendStyle = {
    fontSize: "10px",
    color: "black",
  };

  return (
    <div className="chart-container" style={{ width: "100%", height: `${chartSize}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            dataKey="percent"
            nameKey="name"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            innerRadius={0} // Setting innerRadius to 0 creates a pie chart instead of a doughnut chart
            fill="#8884d8"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

              return (
                <text
                  x={x}
                  y={y}
                  fill={labelStyle.fill}
                  fontSize={labelStyle.fontSize}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {`${percent.toFixed(2)}%`}
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            verticalAlign="middle" // Adjust verticalAlign to your preference
            align="right"
            content={(props) => {
              const { payload } = props;
              return (
                <ul className="legend" style={{ listStyle: "none", padding: 0, fontSize: legendStyle.fontSize }}>
                  {payload.map((entry, index) => (
                    <li key={`legend-${index}`} style={{ color: legendStyle.color }}>
                      <span style={{ backgroundColor: entry.color, width: "12px", height: "12px", display: "inline-block", marginRight: "4px" }} />
                      {entry.value}
                    </li>
                  ))}
                </ul>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
