import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WeatherData {
    coord: {
        lon: string;
        lat: string;
    };
    main: {
        temp: string;
        feels_like: string;
        temp_min: string;
        temp_max: string;
        humidity: string;
        pressure: number;
    };
    name: string;
    dt: string;
    sys: {
        country: string;
        sunrise: string;
        sunset: string;
    };
    timezone: number;
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: string;
    };
}

export interface WeatherState {
    value: WeatherData
};

const initialState: WeatherState = {
    value: {
        coord: {
            lon: '--',
            lat: '--',
        },
        main: {
            temp: '--',
            feels_like: '--',
            temp_min: '--',
            temp_max: '--',
            humidity: '--',
            pressure: 0,
        },
        name: '--',
        dt: '--',
        sys: {
            country: '--',
            sunrise: '--',
            sunset: '--',
        },
        timezone: 0,
        weather: [
            {
                main: '--',
                description: '--',
                icon: '50d',
            },
        ],
        wind: {
            speed: '--',
        },
    },
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<WeatherData>) => {
            state.value = action.payload;
        },
    },
})

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;