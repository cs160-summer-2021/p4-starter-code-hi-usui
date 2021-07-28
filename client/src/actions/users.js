import { USERS_SET_CURRENT } from "actions/types";
import axios from "axios";
import { setAuthToken } from "helpers/_index";

export const userLogin = async () => {
  const res = await axios.get("/api/users/new");
  return res.data;
  // history.push(`/playlists/${playlistId}/display`);
};

export const userLogout = (history) => async (dispatch) => {
  delete localStorage.jwt;
  setAuthToken(false);
  // dispatch(setCurrentUser({}));
};
