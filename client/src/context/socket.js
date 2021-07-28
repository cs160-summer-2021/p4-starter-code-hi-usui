import { USERS_SET_CURRENT } from "actions/types";
import { userLogin } from "actions/users";
import jwt from "jwt-decode";
import { createContext } from "react";
import { io } from "socket.io-client";
import store from "store";

const { clientHeight, clientWidth } = document.documentElement;

if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
  try {
    const user = userLogin({
      user: jwt(localStorage.jwt),
      jwt: localStorage.jwt,
    });
    console.log(user);
    store.dispatch({ type: USERS_SET_CURRENT, payload: user });
  } catch (e) {
    delete localStorage.jwt;
  }
}

export const socket = io(
  new URL("/", window.location.href).href.replace("http", "ws"),
  {
    query: {
      device: clientHeight > 900 || clientWidth > 900 ? "display" : "phone",
    },
  }
);
export const SocketContext = createContext();
