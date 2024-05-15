import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoadingState {
    value: boolean;
    timeout: number;
}

const initialState: LoadingState = {
    value: true,
    timeout: 10,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            if(!action.payload) state.timeout = 10;
            state.value = action.payload;
        },
        setTimeoutToValue: (state, action: PayloadAction<number>) => {
            state.timeout = action.payload;
        },
        decrementTimeout: (state) => {
            state.timeout--;
        }
    },
});

export const { setLoading, setTimeoutToValue, decrementTimeout } = loadingSlice.actions;
export default loadingSlice.reducer;