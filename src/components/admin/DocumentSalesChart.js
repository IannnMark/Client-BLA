import React from "react";
import {
    PieChart,
    Pie,
    Legend,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function DocumentSalesChart({ data }) {
    const pieColors = [
        "#CAF4FF",
        "#A5DD9B",
        "#8C6A5D",
        "#EEE4B1",
        "#FFAB73",
        "#FFD384",
        "#FFF9B0",
        "#FFAEC0",
        "#E2BFB3",
        "#F7DED0",
        "#944E63",
        "#B47B84",
        "#E1AFD1",
        "#AD88C6",
        "#AD88C6",
        "#7469B6",
        "#AFC8AD",
    ];

    const chartSize = 420; // Set the size of the pie chart

    const labelStyle = {
        fontSize: "10px",
        fill: "white",
        fontWeight: "bold", // Add fontWeight for bold text

    };

    const legendStyle = {
        fontSize: "10px",
        color: "black",
    };

    return (
        <div className="chart-container" style={{ width: "100%", height: `${chartSize}px` }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="percent"
                        nameKey="name"
                        isAnimationActive={true}
                        data={data}
                        cx="45%"
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
                                    fill="black" // Change fill color to black
                                    fontSize={labelStyle.fontSize}
                                    fontWeight={labelStyle.fontWeight} //
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                >
                                    {`${percent.toFixed(2)}%`}
                                </text>
                            );
                        }}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        verticalAlign="top"
                        align="right"
                        content={(props) => {
                            const { payload } = props;
                            return (
                                <ul className="legend" style={{ listStyle: "none", padding: 10, fontSize: legendStyle.fontSize, textAlign: "left", textIndent: "-10px", fontWeight: "bold" }}>
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
