import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoadingState {
    value: boolean;
}

const initialState: LoadingState = {
    value: true,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.value = !state.value;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { toggleLoading, setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;