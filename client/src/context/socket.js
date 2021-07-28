import { userLogin, USERS_SET_CURRENT } from "actions/_index";
import { setAuthToken } from "helpers/_index";
import jwt from "jwt-decode";
import { createContext } from "react";
import { io } from "socket.io-client";
import store from "store";

const { clientHeight, clientWidth } = document.documentElement;

try {
  const initUser = async () => {
    const user = await userLogin();
    localStorage.jwt = user.jwt;
  };
  if (localStorage.jwt) {
    setAuthToken(localStorage.jwt);
  } else {
    initUser();
  }
  // store.dispatch({ type: USERS_SET_CURRENT, payload: user });
} catch (e) {
  console.error(`Error with user information due to error '${e}'`);
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
