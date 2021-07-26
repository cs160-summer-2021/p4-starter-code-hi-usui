// import errorsReducer from "reducers/errorsReducer";
import { combineReducers } from "redux"

import playlistsReducer from "./playlists"

export default combineReducers({
  // errors: errorsReducer,
  playlist: playlistsReducer,
})
