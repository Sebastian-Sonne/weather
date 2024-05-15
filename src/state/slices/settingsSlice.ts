import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
    isVisible: boolean,
    prevScollPos: number | null,
    unit: 'metric' | 'imperial' | 'standard',
    theme: 'dark' | 'light',
    time: 12 | 24,
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

var initialTime;
if ('time' in localStorage) {
    initialTime = localStorage.time;
} else {
    initialTime = 24;
    localStorage.time = initialTime;
}

const initialState: SettingsState = {
    isVisible: true,
    prevScollPos: null,
    unit: initialUnit,
    theme: initialTheme,
    time: initialTime,
}

const settingwSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setUnit: (state, action: PayloadAction<'metric' | 'imperial' | 'standard'>) => {
            localStorage.unit = action.payload;
            state.unit = action.payload;
        },
        setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
            localStorage.theme = action.payload;
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
        setTime: (state, action: PayloadAction<12 | 24>) => {
            localStorage.time = action.payload;
            state.time = action.payload;
        }
    },
})

export const { setUnit, setTheme, toggleTheme, setSettingsIsVisible, toggleSettings, setPrevScrollPos, setTime } = settingwSlice.actions;

export default settingwSlice.reducer;