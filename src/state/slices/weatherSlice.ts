import { createSlice } from "@reduxjs/toolkit";

export interface WeatherState {
    value: {
        lat: number,
        lon: number,
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        humidity: number,
        name: string,
        dt: string,
        country: string,
        sunrise: number,
        sunset: number,
        speed: number,
        details: string,
        icon: number
    };
};

const initialState: WeatherState = {
    value: {
        lat: 0,
        lon: 0,
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        humidity: 0,
        name: 'N/A',
        dt: 'N/A',
        country: 'N/',
        sunrise: 0,
        sunset: 0,
        speed: 0,
        details: 'N/A',
        icon: 0
    },
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setWeather: (state, action) => {
            state.value = action.payload;
        },
    },
})

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;