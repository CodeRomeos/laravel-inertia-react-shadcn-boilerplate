import React from "react";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    Tooltip,
} from "recharts";


export default function DebitCreditBarChartSmall({data}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                {/* <Tooltip /> */}
                <Bar dataKey="credit" fill="green" />
                <Bar dataKey="debit" fill="red" />
                <Bar dataKey="balance" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
