import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "../features/cartSlice";
import userSlice from "../features/userSlice";
import wishlistSlice from "../features/wishlistSlice";
import orderSlice from "../features/orderSlice";
import revenueSlice from "../features/revenueSlice";
import categorySlice from "../features/categorySlice";
import currencySlice from "../features/currencySlice"

// create store
const store = configureStore({
  reducer: {
    allCart: cartSlice,
    CurrentUser: userSlice,
    allWishlist: wishlistSlice,
    orders: orderSlice,
    revenue: revenueSlice,
    categorieslist: categorySlice,
    currency: currencySlice,
  },
});

export default store;
