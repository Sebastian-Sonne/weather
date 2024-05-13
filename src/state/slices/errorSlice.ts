import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorState {
    loadingError: string;
    inputError: string;
}

const initialState: ErrorState = {
    loadingError: '',
    inputError: '',
}

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setLoadingError: (state, action: PayloadAction<string>) => {
            state.loadingError = action.payload;
        },
        setInputError: (state, action: PayloadAction<string>) => {
            state.inputError = action.payload;
        },
    },
});

export const { setLoadingError, setInputError } = errorSlice.actions;

export default errorSlice.reducer;