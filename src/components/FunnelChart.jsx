
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { category: 'One', value: 10 },
    { category: 'Two', value: 9 },
    { category: 'Three', value: 6 },
    { category: 'Four', value: 5 },
    { category: 'Five', value: 4 },
    { category: 'Six', value: 3 },
    { category: 'Seven', value: 1 }
];


const colors = [
    "#0693e3", "#0a7fd6", "#0c6bc9", "#0e57bc", "#1043af", "#1230a2", "#141d95"
];

const FunnelChart = () => {
    return (
        <div className='flex justify-center'>
            <ResponsiveContainer width="50%" height={500}>
                <BarChart
                    data={data}
                    layout="horizontal"
                    margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                    barCategoryGap={0}
                >
                    <XAxis
                        type="category"
                        dataKey="category"
                        tick={{ fontSize: 14, fill: '#888' }}
                    />

                    <YAxis
                        type="number"
                        tick={{ fontSize: 14, fill: '#888' }}
                        hide={false}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '5px',
                            padding: '5px',
                            width: '100px',
                            color: 'white',
                        }}
                    />

                    <Bar
                        dataKey="value"
                        shape={(props) => {
                            const { x, y, width, index } = props;
                            const barHeight = data[index].value * 30;
                            const centerY = (500 - barHeight) / 2;

                            return (
                                <rect
                                    x={x}
                                    y={centerY}
                                    width={width}
                                    height={barHeight}
                                    fill={colors[index % colors.length]} // Apply color from the array
                                    rx={10} // Optional: Rounded corners
                                />
                            );
                        }}
                        activeShape={null}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FunnelChart;
