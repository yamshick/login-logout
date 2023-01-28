import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN, REGISTER } from "../../api/constants";
import { httpService } from "../../service/http-service";
import { LOCAL_STORAGE_STATE_KEY } from "../../local-storage";

const initialState = {
  isAuth: false,
  userName: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ login, password }) => {
    const res = await httpService.post(LOGIN, { login, password });
    console.log(res)
    return res
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ name, login, password }) => {
    return await httpService.post(REGISTER, {
      name,
      login,
      password,
    });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY))?.authReducer || initialState,
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
  // extraReducers(builder) {
  //   builder
  //       .addCase(loginThunk.fulfilled, (state, action) => {
  //         console.log(action)
  //       })
  //       .addCase(registerThunk.fulfilled, (state, action) => {
  //         console.log(action)
  //       });
  // },
});

export const { reducer } = authSlice;
