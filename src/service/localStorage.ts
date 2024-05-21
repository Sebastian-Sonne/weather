import { LanguageType, ThemeType, TimeType, UnitType } from "../state/slices/settingsSlice";

interface Settings {
    unit: UnitType;
    theme: ThemeType;
    time: TimeType;
    lang: LanguageType;
}
export const getSettings = (): Settings => JSON.parse(localStorage.settings);
export const setSettings = (settings: Settings) => { localStorage.settings = JSON.stringify(settings) };

export const getUnit = (): UnitType => getSettings().unit;
export const setUnit = (unit: UnitType) => setSettings({ ...getSettings(), unit: unit });

export const getTheme = (): ThemeType => getSettings().theme;
export const setTheme = (theme: ThemeType) => setSettings({ ...getSettings(), theme: theme });

export const getTime = (): TimeType => getSettings().time;
export const setTime = (time: TimeType) => setSettings({ ...getSettings(), time: time });

export const getLanguage = (): LanguageType => getSettings().lang;
export const setLanguage = (lang: LanguageType) => setSettings({ ...getSettings(), lang: lang });

interface Coords {
    lon: number;
    lat: number;
}
export const getCoords = (): Coords => JSON.parse(localStorage.coords);
export const setCoords = (coords: Coords) => { localStorage.coords = JSON.stringify(coords) };