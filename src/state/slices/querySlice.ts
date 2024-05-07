import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserLocation } from "../../service/geocode";

interface QueryState {
    value: string;
}

// Define an async thunk to fetch initial query
export const fetchInitialQuery = createAsyncThunk(
    'query/fetchInitialQuery',
    async () => {
        let initialQuery = '';

        if ('query' in localStorage) {
            initialQuery = '';
        } else {
            const getUserCity = async () => {
                const data = await getUserLocation();
                return data.city;
            };
            
            localStorage.query = await getUserCity();
            initialQuery = localStorage.query;
        }

        return initialQuery;
    }
);

const initialState: QueryState = {
    value: '',
};

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitialQuery.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export const { setQuery } = querySlice.actions;

export default querySlice.reducer;
