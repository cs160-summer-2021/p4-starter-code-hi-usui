import { userLogin, USERS_SET_CURRENT } from "actions/_index";
import { deviceType, setAuthToken } from "helpers/_index";
import jwt_decode from "jwt-decode";
import { createContext } from "react";
import { io } from "socket.io-client";
import store from "store";

export const socket = (async () => {
  try {
    let userId;
    if (localStorage.jwt) {
      setAuthToken(localStorage.jwt);
      const { id } = jwt_decode(localStorage.jwt);
      userId = id;
    } else {
      const userInfo = await userLogin();
      setAuthToken(userInfo.jwt);
      localStorage.jwt = userInfo.jwt;
      userId = userInfo.jwt;
    }
    store.dispatch({ type: USERS_SET_CURRENT, payload: userId });
    return io(new URL("/", window.location.href).href.replace("http", "ws"), {
      query: {
        device: deviceType(),
        jwt: localStorage.jwt,
      },
    });
  } catch (e) {
    console.error(`Error with user information due to error '${e}'`);
  }
})();
export const SocketContext = createContext();
