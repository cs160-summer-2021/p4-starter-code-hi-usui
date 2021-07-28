import { USERS_SET_CURRENT } from "actions/types";
import axios from "axios";
import setAuthToken from "helpers/setAuthToken";

export const userLogin = async () => {
  const res = await axios.get("/api/users/new");
  console.log(res);
  const playlistId = res.data._id;
  return playlistId;
  // history.push(`/playlists/${playlistId}/display`);
};

export const userLogout = (history) => async (dispatch) => {
  delete localStorage.jwt;
  setAuthToken(false);
  // dispatch(setCurrentUser({}));
};
