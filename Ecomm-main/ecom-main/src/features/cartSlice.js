import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  totalAmount: null,
};

// card slice
const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const IteamIndex = state.carts.findIndex(
        (iteam) => iteam._id === action.payload._id
      );

      if (IteamIndex >= 0) {
        state.carts[IteamIndex].quantity += 1;
      } else {
        const temp = { ...action.payload, quantity: 1 };
        state.carts = [...state.carts, temp];
      }
    },

    // remove perticular iteams
    removeToCart: (state, action) => {
      const data = state.carts.filter((ele) => ele._id !== action.payload);
      state.carts = data;
    },

    // remove single iteams
    removeSingleIteams: (state, action) => {
      const IteamIndex_dec = state.carts.findIndex(
        (iteam) => iteam._id === action.payload._id
      );

      if (state.carts[IteamIndex_dec].quantity >= 1) {
        state.carts[IteamIndex_dec].quantity -= 1;
      }
    },

    // clear cart
    emptycartIteam: (state, action) => {
      state.carts = [];
    },

    setTotalAmount: (state, action) => {
      console.log("total amout is", action.payload);
      state.totalAmount = action.payload;
    },
  },
});

export const {
  addToCart,
  removeToCart,
  removeSingleIteams,
  emptycartIteam,
  setTotalAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
