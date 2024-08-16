import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AdminService from "../Services/AdminService";

export const getcategoryList = createAsyncThunk(
  "categories",
  async (thunkAPI) => {
    try {
      const service = AdminService();
      const res = await service.getCategories();
      console.log("ajfaljdfilji", res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const categorySlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getcategoryList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcategoryList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
        state.message = "success";
      })
      .addCase(getcategoryList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
