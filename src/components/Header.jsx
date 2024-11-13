import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-red-500 w-full py-6 flex justify-between px-16 h-[80px] mb-10 items-center">
            <div className="text-center text-white text-2xl font-bold ">
                Recharts
            </div>
            <ul className="flex justify-center space-x-6 ">
                <li className="hover:text-red-200 text-white text-center text-lg">
                    <Link to="/">AreaChart</Link>
                </li>
                <li className="hover:text-red-200 text-white text-lg">
                    <Link to="/barchart">BarChart</Link>
                </li>
                <li className="hover:text-red-200 text-white text-lg">
                    <Link to="/linechart">LineChart</Link>
                </li>
                <li className="hover:text-red-200 text-white text-lg">
                    <Link to="/piechart">PieChart</Link>
                </li>
                <li className="hover:text-red-200 text-white text-lg">
                    <Link to="/speedmetrechart">Speedmetre Chart </Link>
                </li>
                <li className="hover:text-red-200 text-white text-lg">
                    <Link to="/funnelchart">Funnel Chart </Link>
                </li>
                <li className="hover:text-red-200 text-white text-lg">
                    <Link to="/funnelapex">Funnel Chart with Apex </Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
