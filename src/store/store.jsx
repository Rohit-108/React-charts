import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice"
import mapReducer from "./mapSlice"


const store = configureStore({
    reducer: {
        chartData: chartReducer,
        map: mapReducer,
    }
})

export default store;