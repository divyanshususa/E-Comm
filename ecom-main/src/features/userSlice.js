import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../Services/AuthService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getCustomerfromLocalStorage = localStorage.getItem("CurrentUser")
  ? JSON.parse(localStorage.getItem("CurrentUser"))
  : null;

const initialState = {
  user: getCustomerfromLocalStorage?.user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      console.log("payloadd...", action.payload);
      state.user = action.payload;
      console.log("state updated..", state.user);
    },
  },
});

export const { storeUserData } = userSlice.actions;
export default userSlice.reducer;
