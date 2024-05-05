import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CityData {
    name: string;
    local_names: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
}

export interface CityState {
    value: CityData
};

const initialState: CityState = {
    value: {
        name: '',
        local_names: {},
        lat: 0,
        lon: 0,
        country: '',
    },
}

const citySlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<CityData>) => {
            state.value = action.payload;
        },
    },
})

export const { setCity } = citySlice.actions;

export default citySlice.reducer;