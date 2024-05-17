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
        toponymName: 'Test',
        countryName: 'Test',
        lng: 'Test',
        lat: 'Test',
    },
    {
        toponymName: 'Test',
        countryName: 'Test',
        lng: 'Test',
        lat: 'Test',
    },
    {
        toponymName: 'Test',
        countryName: 'Test',
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
        setSearch: (state, action: PayloadAction<QuerySearchResults[]>) => {
            state.results = action.payload;
        },
        setSearchIsVisible: (state, action: PayloadAction<boolean>) => {
            state.searchIsVisible = action.payload;
        },
    },
});

export const { setQuery, setSearch, setSearchIsVisible } = querySlice.actions;
export default querySlice.reducer;