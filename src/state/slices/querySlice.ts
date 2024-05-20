import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SearchData {
    id: number;
    type: string;
    city: string;
    name: string;
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    latitude: number;
    longitude: number;
    population: number;
}

export interface SearchResponse {
    data: SearchData[];
}


interface QueryState {
    value: string;
    searchIsVisible: boolean;
    results: SearchResponse | null;
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
        setSearch: (state, action: PayloadAction<SearchResponse | null>) => {
            state.results = action.payload;
        },
        setSearchIsVisible: (state, action: PayloadAction<boolean>) => {
            state.searchIsVisible = action.payload;
        },
    },
});

export const { setQuery, setSearch, setSearchIsVisible } = querySlice.actions;
export default querySlice.reducer;