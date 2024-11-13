import Title from "./Title";
import { Sector, Cell, PieChart, Pie } from "recharts";

const SpeedMetreChart = () => {
    const width = 600;
    const chartValue = 80;
    const colorData = [
        { value: 40, color: "#4CAF50" },
        { value: 40, color: "#FFC107" },
        { value: 40, color: "#FF5722" },
        { value: 40, color: "#03A9F4" },
        { value: 40, color: "#9C27B0" },
        { value: 40, color: "#FF9800" }
    ];

    const activeSectorIndex = colorData
        .map((cur, index, arr) => {
            const curMax = [...arr]
                .splice(0, index + 1)
                .reduce((a, b) => ({ value: a.value + b.value })).value;
            return chartValue > curMax - cur.value && chartValue <= curMax;
        })
        .findIndex((cur) => cur);

    const sumValues = colorData.map((cur) => cur.value).reduce((a, b) => a + b);

    const arrowData = [
        { value: chartValue },
        { value: 0 },
        { value: sumValues - chartValue }
    ];

    const pieProps = {
        startAngle: 180,
        endAngle: 0,
        cx: width / 2,
        cy: width / 2
    };

    const pieRadius = {
        innerRadius: "75%",
        outerRadius: (width / 2) * 0.45
    };

    const Arrow = ({ cx, cy, midAngle, outerRadius }) => {
        const RADIAN = Math.PI / 180;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const mx = cx + (outerRadius + width * 0.05) * cos;
        const my = cy + (outerRadius + width * 0.05) * sin;
        return (
            <g>
                <g transform={`translate(${cx}, ${cy}) rotate(${360 - midAngle})`}>
                    <path
                        d="M5.60469 9.37139C2.82684 9.54267 0.429368 7.66264 0.276978 5.19354C0.124588 2.72445 2.27269 0.564139 5.05054 0.392861L63.1551 1.279L5.60469 9.37139Z"
                        fill="#2E2E2E"
                    />
                </g>
                <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle">
                    {chartValue === 0 ? null : chartValue}
                </text>
            </g>
        );
    };

    return (
        <div className="flex flex-col justify-center items-center ">
            <Title name="Speed Metre Chart" className="pt-10" />
            <PieChart width={width} height={width / 2 + 30} className="mb-[100px]">
                <text x={345} y={275} textAnchor="middle" dominantBaseline="middle">
                    100
                </text>
                <text x={165} y={275} textAnchor="middle" dominantBaseline="middle">
                    0
                </text>

                <Pie
                    activeIndex={activeSectorIndex}
                    innerRadius="60%"
                    data={colorData}
                    blendStroke
                    fill="#8884d8"
                    {...pieProps}
                >
                    {colorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorData[index].color} />
                    ))}
                </Pie>
                <Pie
                    stroke="none"
                    activeIndex={1}
                    activeShape={Arrow}
                    data={arrowData}
                    outerRadius={pieRadius.innerRadius}
                    fill="none"
                    {...pieProps}
                />
            </PieChart>
        </div>
    );
};

export default SpeedMetreChart;



