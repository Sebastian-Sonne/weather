import { createSlice } from "@reduxjs/toolkit";

export interface HourlyData {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: string;
    rain?: {
        "3h": number;
    };
}

export interface ForecastData {
    cod: string;
    message: number;
    cnt: number;
    list: HourlyData[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

export interface ForecastState {
    value: ForecastData;
}

const initialState: ForecastState = {
    value: {
        cod: "",
        message: 0,
        cnt: 0,
        list: [],
        city: {
            id: 0,
            name: "",
            coord: {
                lat: 0,
                lon: 0
            },
            country: "",
            population: 0,
            timezone: 0,
            sunrise: 0,
            sunset: 0
        }
    }
};

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {
        setForecast: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setForecast } = forecastSlice.actions;

export default forecastSlice.reducer;