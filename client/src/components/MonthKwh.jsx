import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const MonthKwh = ({ data }) => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={20} />
                <YAxis fontSize={20} domain={['auto', 'auto']}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="kWh" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default MonthKwh
