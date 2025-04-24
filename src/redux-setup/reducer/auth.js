import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged: {
    currentCustomer: null,
    isLogged: false,
    error: null,
  },
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.logged.currentCustomer = action.payload;
      state.logged.isLogged = true;
    },
    loggedOut: (state, action) => {
      state.logged.currentCustomer = null;
      state.logged.isLogged = false;
      state.logged.error = null;
    },
    updatedCustomer: (state, action) => {
      state.logged.currentCustomer.customer.fullName = action.payload.fullName;
      state.logged.currentCustomer.customer.phone = action.payload.phone;
      state.logged.currentCustomer.customer.address = action.payload.address;
    },
  },
});

export const { loggedIn, loggedOut, updatedCustomer } = authReducer.actions;
export default authReducer.reducer;
