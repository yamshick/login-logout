import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./reducers/auth-slice";

const rootReducer = combineReducers({
  authReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
