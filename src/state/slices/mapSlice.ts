import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MapState {
    position: [number, number] | null;
    isVisible: boolean;
}

const initialState: MapState = {
    position: null,
    isVisible: false,
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setPosition: (state, action: PayloadAction<[number, number] | null>) => {
            state.position = action.payload;
        },
        setMapIsVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
    },
});

export const { setPosition, setMapIsVisible } = mapSlice.actions;
export default mapSlice.reducer;