import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserLocation } from "../../service/geocode";

interface QueryState {
    value: string
}

var initialQuery;
if ('query' in localStorage) {
    initialQuery = '';
} else {
    const getUserCity = async () => {
        const data = await getUserLocation();
        return await data.city;
    }
    
    localStorage.query = await getUserCity();
    initialQuery = '';
}

const initialState: QueryState = {
    value: initialQuery,
}

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setQuerry: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
})

export const { setQuerry } = querySlice.actions;

export default querySlice.reducer;