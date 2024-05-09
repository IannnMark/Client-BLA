import React, { useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function MonthlyRequestsChart({ data }) {
    const [xValues, setXValues] = useState([]);

    const formatDate = (date) => {
        if (xValues.includes(date.getMonth())) {
            setXValues([...xValues, date.getMonth()]);
        }
        return "";
    };

    return (
        <ResponsiveContainer width="90%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid stroke="#d0d0d0" strokeDasharray="3 3" />
                <XAxis dataKey="month" axisLine={{ stroke: "#8884d8" }} />
                <YAxis axisLine={{ stroke: "#8884d8" }} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}