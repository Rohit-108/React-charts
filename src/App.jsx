
import Header from "./components/Header";

import AreaChartComponent from './components/AreaChart';
import BarChartComponent from './components/BarChart';
import LineChartComponent from './components/LineChart';
import PieChartComponent from './components/PieChart';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
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
        element: <AreaChartComponent />
      },
      {
        path: "/barchart",
        element: <BarChartComponent />
      },
      {
        path: "/linechart",
        element: <LineChartComponent />
      },
      {
        path: "/piechart",
        element: <PieChartComponent />
      }
    ]
  }
])
export default App