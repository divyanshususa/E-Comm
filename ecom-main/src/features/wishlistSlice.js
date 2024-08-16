import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

// card slice
const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    // add to cart
    addToWishlist: (state, action) => {
      console.log("added to wishlist ", action.payload);

      const IteamIndex = state.wishlist.findIndex(
        (iteam) => iteam._id === action.payload._id
      );

      if (IteamIndex >= 0) {
        state.wishlist[IteamIndex].quantity += 1;
      } else {
        const temp = { ...action.payload, quantity: 1 };
        state.wishlist = [...state.wishlist, temp];
      }
    },

    // remove perticular iteams
    removeToWishlist: (state, action) => {
      console.log("hwere...");
      const data = state.wishlist.filter(
        (ele) => ele._id !== action.payload._id
      );
      state.wishlist = data;
      console.log("herer the data ", data);
    },

    // remove single iteams
    // removeSingleIteams:(state,action)=>{
    //     const IteamIndex_dec = state.wishlist.findIndex((iteam) => iteam._id === action.payload._id);

    //     if(state.wishlist[IteamIndex_dec].quantity >=1){
    //         state.wishlist[IteamIndex_dec].quantity -= 1
    //     }

    // },

    // // clear cart
    // emptycartIteam:(state,action)=>{
    //     state.wishlist = []
    // }
  },
});

export const { addToWishlist, removeToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
