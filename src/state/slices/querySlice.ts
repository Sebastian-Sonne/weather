import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface QuerySearchResults {
    toponymName: string;
    countryName: string;
    lng: string;
    lat: string;
}

interface QueryState {
    value: string;
    searchIsVisible: boolean;
    results: QuerySearchResults[] | null;
}

const initialState: QueryState = {
    value: '',
    searchIsVisible: false,
    results: [{
        toponymName: 'Erlangen',
        countryName: 'Germany',
        lng: '1',
        lat: '1',
    },
    {
        toponymName: 'Singapore',
        countryName: 'Singapore',
        lng: 'Test',
        lat: 'Test',
    },
    {
        toponymName: 'Houston',
        countryName: 'United States of America',
        lng: 'Test',
        lat: 'Test',
    }],
};

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setSearch: (state, action: PayloadAction<QuerySearchResults[] | null>) => {
            state.results = action.payload;
        },
        setSearchIsVisible: (state, action: PayloadAction<boolean>) => {
            state.searchIsVisible = action.payload;
        },
    },
});

export const { setQuery, setSearch, setSearchIsVisible } = querySlice.actions;
export default querySlice.reducer;