import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function UserRequestsChart({ data }) {
    const barColors = ["#FFCBCB", "#FFBB70", "#BED7DC", "#9195F6", "#535C91", "#C68484", "#40A2E3", "#DCFFB7"];
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis
                    dataKey="userDetails.firstname"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    label={{
                        value: '',
                        angle: -90,
                        position: 'insideLeft'
                    }}
                    tick={{ fontSize: 15, fill: 'black' }}
                    axisLine={false}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" stroke="#000000" strokeWidth={5}>
                    {data.map((item, index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
