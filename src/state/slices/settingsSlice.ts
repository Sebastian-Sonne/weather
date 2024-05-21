import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as storage from "../../service/localStorage";

export type UnitType = 'metric' | 'imperial' | 'standard';
export type ThemeType = 'dark' | 'light';
export type TimeType = 12 | 24;
export type LanguageType = 'de' | 'en';

export interface SettingsState {
    isVisible: boolean,
    prevScollPos: number | null,
    unit: UnitType,
    theme: ThemeType,
    time: TimeType,
    lang: LanguageType,
}

export const getUserPreferedTheme = (): 'dark' | 'light' => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const initialUnit = ('settings' in localStorage) ? storage.getUnit() : 'metric';
const initialTheme = ('settings' in localStorage) ? storage.getTheme() : getUserPreferedTheme();
const initialTime = ('settings' in localStorage) ? storage.getTime() : 24;
const initialLanguage = ('settings' in localStorage) ? storage.getLanguage() : 'en';

storage.setSettings({
    unit: initialUnit,
    time: initialTime,
    theme: initialTheme,
    lang: initialLanguage,
})

const initialState: SettingsState = {
    isVisible: false,
    prevScollPos: null,
    unit: initialUnit,
    theme: initialTheme,
    time: initialTime,
    lang: initialLanguage,
}

const settingwSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setUnit: (state, action: PayloadAction<UnitType>) => {
            storage.setUnit(action.payload);
            state.unit = action.payload;
        },
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            storage.setTheme(action.payload);
            state.theme = action.payload;
        },
        toggleTheme: (state) => {
            const newTheme = (state.theme === 'dark') ? 'light' : 'dark';
            storage.setTheme(newTheme);
            state.theme = newTheme;
        },
        setTime: (state, action: PayloadAction<TimeType>) => {
            storage.setTime(action.payload);
            state.time = action.payload;
        },
        setLang: (state, action: PayloadAction<LanguageType>) => {
            storage.setLanguage(action.payload);
            state.lang = action.payload;
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

export const { setUnit, setTheme, toggleTheme, setSettingsIsVisible, toggleSettings, setPrevScrollPos, setTime, setLang } = settingwSlice.actions;

export default settingwSlice.reducer;