// import errorsReducer from "reducers/errorsReducer";
import { combineReducers } from "redux";

import playlistsReducer from "./playlists";
import usersReducer from "./users";

export default combineReducers({
  playlist: playlistsReducer,
  user: usersReducer,
});
