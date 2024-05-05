import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    name: string;
    dt: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    weather: {
        main: string;
        icon: number;
    }[];
    wind: {
        speed: number;
    };
}

export interface WeatherState {
    value: WeatherData
};

const initialState: WeatherState = {
    value: {
        coord: {
            lon: 0,
            lat: 0,
        },
        main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            humidity: 0,
        },
        name: '',
        dt: '',
        sys: {
            country: '',
            sunrise: 0,
            sunset: 0,
        },
        weather: [
            {
                main: '',
                icon: 0,
            },
        ],
        wind: {
            speed: 0,
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