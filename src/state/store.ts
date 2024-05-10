import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './slices/querySlice';
import weatherReducer from './slices/weatherSlice';
import cityReducer from './slices/citySlice';
import settingReducer from './slices/settingsSlice'
import forecastSlice from './slices/forecastSlice';

export const store = configureStore({
    reducer: {
        query: queryReducer,
        weather: weatherReducer,
        forecast: forecastSlice,
        city: cityReducer,
        settings: settingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;