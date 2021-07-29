import {
  PLAYLIST_SET,
  PLAYLIST_SONG_ADD,
  PLAYLIST_USER_CONNECT,
} from "actions/types";

const initialState = { playlistId: null, songs: [], users: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_SET:
      return {
        ...state,
        playlistId: action.payload,
      };
    case PLAYLIST_SONG_ADD:
      if (action.payload.playlistId == state.playlistId) {
        return {
          ...state,
          songs: [...state.songs, action.payload],
        };
      } else {
        return state;
      }
    case PLAYLIST_USER_CONNECT:
      if (action.payload.playlistId == state.playlistId) {
        return {
          ...state,
          users: [...state.users, action.payload.userId],
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
