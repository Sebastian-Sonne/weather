import { createSlice } from "@reduxjs/toolkit";

interface QueryState {
    value: {
        cityName: string,
        long: number,
        lat: number,
    };
}

const initialState: QueryState = {
    value: {
        cityName: 'berlin',
        long: 0,
        lat: 0,
    },
}

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setQuerry: (state, payload) => {
            state.value = state.value;
        },
    },
})

export const { setQuerry } = querySlice.actions;

export default querySlice.reducer;