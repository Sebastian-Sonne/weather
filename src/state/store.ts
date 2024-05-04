import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import queryReducer from './slices/querySlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        query: queryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;