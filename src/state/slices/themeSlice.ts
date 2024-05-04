import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    value: string;
};

var useTheme;
if ('theme' in localStorage) {
    useTheme = localStorage.theme;
} else {
    useTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.add((useTheme) ? 'dark' : '');
    localStorage.theme = useTheme ? 'dark' : 'light';
}

const initialState: ThemeState = {
    value: useTheme,
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = (state.value === 'dark') ? 'light' : 'dark';
            localStorage.theme = state.value;
        },
    },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;