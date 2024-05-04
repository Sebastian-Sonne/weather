import { createSlice } from "@reduxjs/toolkit";

interface QueryState {
    value: { q: string };
}

const initialState: QueryState = {
    value: { q: 'berlin'},
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