import React from "react";
import Title from './Title';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Student A', Math: 85, Science: 78, English: 92 },
    { name: 'Student B', Math: 90, Science: 88, English: 76 },
    { name: 'Student C', Math: 75, Science: 85, English: 89 },
    { name: 'Student D', Math: 95, Science: 92, English: 81 },
];

const CustomLegend = ({ payload }) => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '10px 0' }}>
        {payload.map((entry, index) => (
            <div key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: entry.color }}></div>
                <span style={{ color: '#333', fontSize: '14px' }}>{entry.value}</span>
            </div>
        ))}
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={`tooltip-item-${index}`} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CustomXAxisTick = ({ x, y, payload }) => (
    <text x={x} y={y + 15} textAnchor="middle" fill="#333" fontSize="12px">
        {payload.value}
    </text>
);

const BarChartComponent = () => (
    <div className='flex flex-col justify-center items-center p-5'>
        <Title name="Student Marks Bar Chart" />
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={<CustomXAxisTick />} />
                <YAxis label={{ value: "Scores", angle: -90, position: 'insideLeft', offset: -10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Bar dataKey="Math" fill="#8884d8" />
                <Bar dataKey="Science" fill="#82ca9d" />
                <Bar dataKey="English" fill="#ffc658" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default BarChartComponent;
