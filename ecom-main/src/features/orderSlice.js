import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrders: [],
};

// card slice
const orderSlice = createSlice({
  name: "userOrderslice",
  initialState,
  reducers: {
    // add to cart
    addToUserOrders: (state, action) => {
      console.log("orders added..", action.payload);
      state.userOrders = action.payload;
    },
  },
});

export const { addToUserOrders } = orderSlice.actions;

export default orderSlice.reducer;
