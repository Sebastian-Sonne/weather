import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface QuerySearchResults {
    toponymName: string;
    countryName: string;
    lng: string;
    lat: string;
}

interface QueryState {
    value: string;
    results: QuerySearchResults[];
}

const initialState: QueryState = {
    value: '',
    results: [
        {
            toponymName: '',
            countryName: '',
            lng: '',
            lat: '',
        }
    ]
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
        }
    },
});

export const { setQuery, setSearch } = querySlice.actions;
export default querySlice.reducer;