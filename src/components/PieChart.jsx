
import Title from './Title';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { CustomLegend, CustomTooltip } from "./CustomComponent";
import { useSelector } from 'react-redux';

const PieChartComponent = ({ chartId }) => {

    const pieChartData = useSelector((state) => state.chartData.chartData[chartId])
    const pieChartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
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
}

export default PieChartComponent;
