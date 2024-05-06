import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsData {
    unit: string,
}

export interface SettingsState {
    value: SettingsData,
}

const initialState: SettingsState = {
    value: {
        unit: 'metric'
    },
}

const settingwSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<SettingsData>) => {
            state.value = action.payload;
        },
    },
})

export const { setCity } = settingwSlice.actions;

export default settingwSlice.reducer;