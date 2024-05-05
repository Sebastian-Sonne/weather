import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface QueryState {
    value: string
}

const initialState: QueryState = {
    value: 'berlin',
}

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setQuerry: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
})

export const { setQuerry } = querySlice.actions;

export default querySlice.reducer;