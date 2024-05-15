import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
    isVisible: boolean,
    prevScollPos: number | null,
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
    initialUnit = localStorage.unit;
} else {
    initialUnit = 'metric';
    localStorage.unit = initialUnit;
}

const initialState: SettingsState = {
    isVisible: false,
    prevScollPos: null,
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
        setSettingsIsVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
        toggleSettings: (state) => {
            state.isVisible = !state.isVisible;
        },
        setPrevScrollPos: (state, action: PayloadAction<number | null>) => {
            state.prevScollPos = action.payload;
        },
    },
})

export const { setUnit, setTheme, toggleTheme, setSettingsIsVisible, toggleSettings, setPrevScrollPos } = settingwSlice.actions;

export default settingwSlice.reducer;