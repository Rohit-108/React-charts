import React from 'react';
import {
    ComposedChart,
    Area,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import Title from './Title';

const composedChartData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const ComposedChartComponent = () => {
    return (
        <div className="flex flex-col justify-center items-center p-5 bg-gray-100 rounded-lg shadow-lg">
            <Title name="Enhanced Performance Chart" />
            <ResponsiveContainer width="70%" height={400}>
                <ComposedChart
                    data={composedChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="4 4" stroke="#ddd" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#333', fontSize: 12, fontWeight: 'bold' }}
                        stroke="#666"
                        label={{
                            value: 'Pages',
                            position: 'insideBottom',
                            offset: -5,
                            fill: '#444',
                            fontWeight: 'bold',
                        }}
                    />
                    <YAxis
                        tick={{ fill: '#333', fontSize: 12, fontWeight: 'bold' }}
                        tickFormatter={(value) => {
                            if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
                            if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                            return value;
                        }}
                        stroke="#666"
                        label={{
                            value: 'Values',
                            angle: -90,
                            position: 'insideLeft',
                            offset: -5,
                            fill: '#444',
                            fontWeight: 'bold',
                        }}
                    />
                    <Tooltip
                        formatter={(value, name) => {
                            const colorMap = {
                                amt: '#ff4c4c',
                                pv: '#4caf50',
                                uv: '#2196f3',
                            };
                            return <span style={{ color: colorMap[name] }}>{value}</span>;
                        }}
                        contentStyle={{
                            backgroundColor: '#222',
                            color: '#fff',
                            borderRadius: '8px',
                            border: 'none',
                        }}
                        cursor={{ fill: '#f0f0f0' }}
                    />
                    <Legend
                        payload={[
                            { value: 'Area Data', type: 'circle', color: '#ff4c4c' },
                            { value: 'Bar Data', type: 'circle', color: '#4caf50' },
                            { value: 'Line Data', type: 'circle', color: '#2196f3' },
                        ]}
                        wrapperStyle={{
                            fontSize: 14,
                            fontWeight: 'bold',

                        }}

                        align="center"
                        verticalAlign="top"
                    />
                    <Area
                        type="monotone"
                        dataKey="amt"
                        fill="#ffb3b3"
                        stroke="#ff4c4c"
                        strokeWidth={2}
                        activeDot={{
                            r: 6,
                            fill: '#fff',
                            stroke: '#ff4c4c',
                            strokeWidth: 2,
                        }}
                    />
                    <Bar
                        dataKey="pv"
                        fill="#4caf50"
                        radius={[10, 10, 0, 0]}
                        barSize={20}
                    />
                    <Line
                        type="monotone"
                        dataKey="uv"
                        stroke="#2196f3"
                        strokeWidth={2}
                        dot={{
                            r: 5,
                            fill: '#fff',
                            stroke: '#2196f3',
                            strokeWidth: 2,
                        }}
                        activeDot={{
                            r: 7,
                            fill: '#2196f3',
                            stroke: '#fff',
                            strokeWidth: 2,
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComposedChartComponent;
