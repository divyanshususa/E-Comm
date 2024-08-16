import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currencyType: null
};

// card slice
const currencySlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {
        // add to cart
        currencyType: (state, action) => {
            state.currencyType = action.payload
        },


    },
});

export const {
    currencyType
} = currencySlice.actions;

export default currencySlice.reducer;
