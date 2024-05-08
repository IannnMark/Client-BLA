import {
    PieChart,
    Pie,
    Legend,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function RequestPaymentMethodChart({ requests }) {
    // Count the occurrences of each payment method
    const methodCounts = {};
    requests.forEach((request) => {
        const method = request.paymentInfo;
        methodCounts[method] = (methodCounts[method] || 0) + 1;
    });

    // Prepare data for the chart
    const data = Object.keys(methodCounts).map((method) => ({
        name: method,
        value: methodCounts[method],
    }));

    const legendStyle = {
        fontSize: "10px",
        color: "black",
    };

    // Set colors for the pie chart
    const pieColors = ["#1D2B53", "#FF6868", "#FFBB64", "#FFEAA7", "#FF33FF"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ width: "100%", height: "500px", textAlign: "center" }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value"
                        nameKey="name"
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={150} // Adjust outerRadius to make the pie smaller
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={pieColors[index % pieColors.length]}
                            />
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
                                <ul
                                    className="legend"
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        fontSize: legendStyle.fontSize,
                                    }}
                                >
                                    {payload.map((entry, index) => (
                                        <li
                                            key={`legend-${index}`}
                                            style={{ color: legendStyle.color }}
                                        >
                                            <span
                                                style={{
                                                    backgroundColor: entry.color,
                                                    width: "12px",
                                                    height: "12px",
                                                    display: "inline-block",
                                                    marginRight: "4px",
                                                }}
                                            />
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
