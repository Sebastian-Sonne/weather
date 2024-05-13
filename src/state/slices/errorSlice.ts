import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorState {
    inputError: string;
}

const initialState: ErrorState = {
    inputError: '',
}

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setInputError: (state, action: PayloadAction<string>) => {
            state.inputError = action.payload;
        },
    },
});

export const { setInputError } = errorSlice.actions;

export default errorSlice.reducer;