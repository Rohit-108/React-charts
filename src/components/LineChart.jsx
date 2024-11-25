import Title from './Title';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomLegend, CustomTooltip, CustomXAxisTick } from './CustomComponent';
import { useSelector } from 'react-redux';

const LineChartComponent = ({ chartId }) => {

    const lineChartData = useSelector((state) => state.chartData.chartData[chartId])

    return (
        <div className='flex flex-col justify-center items-center p-5'>
            <Title name="Line Chart" />
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={<CustomXAxisTick />} />
                    <YAxis label={{ value: 'Values', angle: -90, position: 'insideLeft', offset: -10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChartComponent;
