import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import queryReducer from './slices/querySlice';
import weatherReducer from './slices/weatherSlice';
import cityReducer from './slices/citySlice';
import settingReducer from './slices/settingsSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        query: queryReducer,
        weather: weatherReducer,
        city: cityReducer,
        settings: settingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;