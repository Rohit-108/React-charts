import Title from './Title';
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
import { CustomLegend, CustomTooltip, CustomXAxisTick } from './CustomComponent';
import { useSelector } from 'react-redux';

const ComposedChartComponent = ({ chartId }) => {
    const composedChartData = useSelector((state) => state.chartData.chartData[chartId]);

    return (
        <div className="flex flex-col justify-center items-center p-5">
            <Title name="Student Performance Composed Chart" />
            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                    data={composedChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={<CustomXAxisTick />} />
                    <YAxis
                        label={{
                            value: "Scores",
                            angle: -90,
                            position: "insideLeft",
                            offset: -10,
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                    <Area type="monotone" dataKey="Total" fill="#f0ad4e" stroke="#f0ad4e" />
                    <Bar dataKey="Math" fill="#8884d8" />
                    <Bar dataKey="Science" fill="#82ca9d" />
                    <Bar dataKey="English" fill="#ffc658" />
                    <Line type="monotone" dataKey="Average" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComposedChartComponent;
