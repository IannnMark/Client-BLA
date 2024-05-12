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
        <ResponsiveContainer width="80%" height={360}> {/* Increase the height */}
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="userDetails.firstname" tick={{ fontSize: 12 }} />
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

