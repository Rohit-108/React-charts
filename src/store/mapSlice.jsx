import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentLocation: [28.63977, 77.42302],
    locations: [
        { lat: 28.7041, lon: 77.1025, name: "Delhi" },
        { lat: 27.1767, lon: 78.0081, name: "Agra" },
        { lat: 26.9124, lon: 75.7873, name: "Jaipur" },
        { lat: 28.5355, lon: 77.391, name: "Noida" },
    ],
    suggestions: [],
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers:
    {

        setCurrentLocation(state, action) {
            state.currentLocation = action.payload;
        },
        setSuggestions(state, action) {
            state.suggestions = action.payload;
        },
    }


}
)

export const { setCurrentLocation, setSuggestions } = mapSlice.actions;

export default mapSlice.reducer;