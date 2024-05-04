import { createSlice } from "@reduxjs/toolkit";

interface WeatherState {
    value: {
        name: string,
        temperature: number,
        realFeel: number,
        chanceOfRain: number,
        windSpeed: number,
        UVIndex: number,
        hourlyForecast: [],
        dailyForecast: [],
    };
};

const initialState: WeatherState = {
    value: {
        name: '',
        temperature: 0,
        realFeel: 0,
        chanceOfRain: 0,
        windSpeed: 0,
        UVIndex: 0,
        hourlyForecast: [],
        dailyForecast: [],
    },
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setWeather: (state, payload) => {
            state.value = state.value;
        },
    },
})

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;