import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
  name: "",
  email: "",
  password: "",
  resetToken: "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    UserData: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.resetToken = "";
      state.userId = "";
    },
    setResetPassword: (state, action) => {
      state.resetToken = action.payload.resetToken;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    successResetPassword: (state) => {
      state.resetToken = "";
      state.email = "";
      state.userId = "";
    },
  },
});

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  UserData,
  setResetPassword,
  successResetPassword,
} = authSlice.actions;

export default authSlice.reducer;
