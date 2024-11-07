
import Title from './Title';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { pieChartData, pieChartColors } from '../utills/chartData';
import { CustomLegend, CustomTooltip } from "./CustomComponent";

const PieChartComponent = () => (
    <div className='flex flex-col justify-center items-center p-5'>
        <Title name="Pie Chart" />
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={150}
                    label={({ name, value }) => `${name}: ${value}`}
                >
                    {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
            </PieChart>
        </ResponsiveContainer>
    </div>
);

export default PieChartComponent;
