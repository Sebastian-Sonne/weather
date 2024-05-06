import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
    unit: string,
    theme: string,
}

var initialTheme;
if ('theme' in localStorage) {
    initialTheme = localStorage.theme;
} else {
    const initialIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.theme = (initialIsDark) ? 'dark' : 'light';
    initialTheme = (initialIsDark) ? 'dark' : 'light';
}

var initialUnit;
if ('unit' in localStorage) {
    initialUnit = localStorage.theme;
} else {
    initialUnit = 'metric';
    localStorage.unit = initialUnit;
}

const initialState: SettingsState = {
    unit: initialUnit,
    theme: initialTheme,
}

const settingwSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setUnit: (state, action: PayloadAction<string>) => {
            state.unit = action.payload;
        },
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        toggleTheme: (state) => {
            const newTheme = (state.theme === 'dark') ? 'light' : 'dark';
            localStorage.theme = newTheme;
            state.theme = newTheme;
        },
    },
})

export const { setUnit, setTheme, toggleTheme } = settingwSlice.actions;

export default settingwSlice.reducer;