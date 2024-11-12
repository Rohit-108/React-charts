import Title from './Title';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { barChartData } from '../utills/chartData';
import { CustomLegend, CustomTooltip, CustomXAxisTick } from './CustomComponent';

const BarChartComponent = () => (
    <div className='flex flex-col justify-center items-center p-5'>
        <Title name="Student Marks Bar Chart" />
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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