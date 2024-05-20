import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityData } from "./citySlice";

interface QueryState {
    value: string;
    searchIsVisible: boolean;
    results: CityData[] | null;
}

const initialState: QueryState = {
    value: '',
    searchIsVisible: false,
    results: null,
};

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setSearch: (state, action: PayloadAction<CityData[] | null>) => {
            state.results = action.payload;
        },
        setSearchIsVisible: (state, action: PayloadAction<boolean>) => {
            state.searchIsVisible = action.payload;
        },
    },
});

export const { setQuery, setSearch, setSearchIsVisible } = querySlice.actions;
export default querySlice.reducer;