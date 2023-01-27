import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN, REGISTER } from "../../api/constants";
import { httpService } from "../../service/http-service";

const initialState = {
  isAuth: false,
  userName: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ login, password }) => {
    const response = await httpService.post(LOGIN, { login, password });
    console.log(response);
    return response;
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ name, login, password }) => {
    const response = await httpService.post(REGISTER, {
      name,
      login,
      password,
    });
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log(action);
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      console.log(action);
    });
  },
});

export const { reducer } = authSlice;
