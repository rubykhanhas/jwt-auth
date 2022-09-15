import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import AuthAPI from "../api/auth.api";

const initialState = {
  loading: false,
  error: "",
  username: "",
  userID: "",
  accessToken: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (value: ILoginValue, {rejectWithValue}) => {
    try {
      const res = await AuthAPI.login(value);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (arg, {rejectWithValue}) => {
  try {
    const res = await AuthAPI.logout();
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return rejectWithValue(error.response?.data);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (arg, {rejectWithValue}) => {
  try {
    const res = await AuthAPI.refresh();
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return rejectWithValue(error.response?.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region LOGIN
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.username = "";
      state.userID = "";
      state.accessToken = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const {accessToken, userID, username} = action.payload!.data;
      state.loading = false;
      state.error = "";
      state.username = username;
      state.userID = userID;
      state.accessToken = accessToken;
    });
    //#endregion
    //#region LOGOUT
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.username = "";
      state.userID = "";
      state.accessToken = "";
    });
    //#endregion
    //#region REFRESH
    builder.addCase(refresh.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.username = "";
      state.userID = "";
      state.accessToken = "";
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.accessToken = action.payload!.data.accessToken;
    });
    //#endregion
  },
});

export default authSlice.reducer;
