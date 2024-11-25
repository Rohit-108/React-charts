
import Header from "./components/Header";
import store from "./store/store"
import AreaChartComponent from './components/AreaChart';
import BarChartComponent from './components/BarChart';
import LineChartComponent from './components/LineChart';
import PieChartComponent from './components/PieChart';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import SpeedometerChart from "./components/Speedmeterchart";
import FunnelChart from "./components/FunnelChart";
import ApexChart from "./components/FuunelApex";
import Map from "./components/Map";
import { Provider } from "react-redux";


const App = () => {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </>
  );
};

const AppLayout = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <AreaChartComponent chartId="areaChartData" />
      },
      {
        path: "/barchart",
        element: <BarChartComponent chartId="barChartData" />
      },
      {
        path: "/linechart",
        element: <LineChartComponent chartId="lineChartData" />
      },
      {
        path: "/piechart",
        element: <PieChartComponent chartId="pieChartData" />
      },
      {
        path: "/speedmetrechart",
        element: <SpeedometerChart chartId="colorData" />
      },
      {
        path: "/funnelchart",
        element: <FunnelChart chartId="funnelChartData" />
      },
      {
        path: "/funnelapex",
        element: <ApexChart />
      },
      {
        path: "/map",
        element: <Map />
      }
    ]
  }
])
export default App