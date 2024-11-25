import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    chartData: {
        areaChartData: [
            { name: 'Jan', uv: 4000, pv: 2400 },
            { name: 'Feb', uv: 3000, pv: 1398 },
            { name: 'Mar', uv: 2000, pv: 9800 },
            { name: 'Apr', uv: 2780, pv: 3908 },
            { name: 'May', uv: 1890, pv: 4800 },
            { name: 'Jun', uv: 2390, pv: 3800 },
            { name: 'Jul', uv: 3490, pv: 4300 },
        ],

        barChartData: [
            { name: 'Student A', Math: 85, Science: 78, English: 92 },
            { name: 'Student B', Math: 90, Science: 88, English: 76 },
            { name: 'Student C', Math: 75, Science: 85, English: 89 },
            { name: 'Student D', Math: 95, Science: 92, English: 81 },
        ],

        lineChartData: [
            { name: 'Page A', uv: 4000, pv: 2400 },
            { name: 'Page B', uv: 3000, pv: 1398 },
            { name: 'Page C', uv: 2000, pv: 9800 },
            { name: 'Page D', uv: 2780, pv: 3908 },
            { name: 'Page E', uv: 1890, pv: 4800 },
            { name: 'Page F', uv: 2390, pv: 3800 },
            { name: 'Page G', uv: 3490, pv: 4300 },
        ],

        pieChartData: [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
        ],
        funnelChartData: [
            { category: 'One', value: 10 },
            { category: 'Two', value: 9 },
            { category: 'Three', value: 6 },
            { category: 'Four', value: 5 },
            { category: 'Five', value: 4 },
            { category: 'Six', value: 3 },
            { category: 'Seven', value: 1 }
        ],
        colorData: [
            { value: 40, color: "#4CAF50" },
            { value: 40, color: "#FFC107" },
            { value: 40, color: "#FF5722" },
            { value: 40, color: "#03A9F4" },
            { value: 40, color: "#9C27B0" },
            { value: 40, color: "#FF9800" }
        ],
    }
}



const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
        updateChartData: (state, action) => {
            const { chartId, data } = action.payload;
            state.chartData[chartId] = data;
        },
    },
})

export const { updateChartData } = chartSlice.actions;
export default chartSlice.reducer;