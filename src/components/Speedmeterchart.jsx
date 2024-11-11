import { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const SpeedometerChart = () => {
    const [speed, setSpeed] = useState(50);

    const [data, setData] = useState([
        { name: 'Speed', value: speed, fill: '#8884d8' },
    ]);

    useEffect(() => {
        setData([{ name: 'Speed', value: speed, fill: getSpeedColor(speed) }]);
    }, [speed]);

    const getSpeedColor = (speed) => {
        if (speed < 30) return '#82ca9d';
        if (speed < 70) return '#ffbb28';
        return '#ff4d4f';
    };

    const calculateNeedleAngle = (speed) => {
        return (speed / 100) * 180 - 90;
    };

    return (
        <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={400}>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="80%"
                    outerRadius="100%"
                    barSize={10}
                    data={data}
                    startAngle={180}
                    endAngle={0}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                        axisLine={false}
                        tickLine={false}
                    />

                    <RadialBar
                        minAngle={15}
                        clockWise
                        dataKey="value"
                        cornerRadius={10}
                    />

                    {/* Needle */}
                    <line
                        x1="50%"
                        y1="80%"
                        x2="50%"
                        y2="40%"
                        stroke="#000"
                        strokeWidth="6"
                        style={{
                            transform: `rotate(${calculateNeedleAngle(speed)}deg)`,
                            transformOrigin: '50% 85%',
                            transition: 'transform 0.5s ease-out',
                        }}
                    />
                </RadialBarChart>
            </ResponsiveContainer>


            <div className="mt-5 flex justify-center">
                <button
                    onClick={() => setSpeed((prev) => Math.max(prev - 10, 0))}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Decrease Speed
                </button>
                <button
                    onClick={() => setSpeed((prev) => Math.min(prev + 10, 100))}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Increase Speed
                </button>
            </div>


            <div className="mt-5 text-center">
                <h2 className="text-2xl font-semibold">{speed} km/h</h2>
            </div>
        </div>
    );
};

export default SpeedometerChart;
