import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MapState {
    position: [number, number];
    isVisible: boolean;
}

const initialState: MapState = {
    position: [0,0],
    isVisible: false,
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setPosition: (state, action: PayloadAction<[number, number]>) => {
            state.position = action.payload;
        },
        setMapIsVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
        toggleMapIsVisible: (state) => {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { setPosition, setMapIsVisible, toggleMapIsVisible } = mapSlice.actions;
export default mapSlice.reducer;