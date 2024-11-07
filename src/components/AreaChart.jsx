import Title from './Title';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { areaChartData } from '../utills/chartData';
import { CustomLegend, CustomTooltip, CustomXAxisTick } from './CustomComponent';






const AreaChartComponent = () => {
    return (
        <div className='flex flex-col justify-center items-center p-5'>
            <Title name="Area Chart" />
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={areaChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={<CustomXAxisTick />} />
                    <YAxis label={{ value: 'Values', angle: -90, position: 'insideLeft', offset: -10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AreaChartComponent;
