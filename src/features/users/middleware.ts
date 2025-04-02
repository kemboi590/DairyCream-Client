// import { Middleware } from "@reduxjs/toolkit";
import { Middleware } from "@reduxjs/toolkit";
import { logOut } from "./userSlice";
import { jwtDecode } from 'jwt-decode';

const tokenExpirationMiddleware: Middleware = store => next => action => {
  const state = store.getState();
  const token = state.user.token;

  if (token) {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000; // to get in seconds

      if (exp < currentTime) {
        try {
          store.dispatch(logOut());
        } catch (error) {
          console.error("Failed to logout");
        }
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  }

  return next(action);
};

export default tokenExpirationMiddleware;

