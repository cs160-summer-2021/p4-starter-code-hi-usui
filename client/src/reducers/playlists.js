import {
  PLAYLIST_SET,
  PLAYLIST_SONG_ADD,
  PLAYLIST_SONG_REMOVE,
  PLAYLIST_USER_ADD,
  PLAYLIST_USER_REMOVE,
} from "actions/types";
import _ from "lodash";

const initialState = { songs: [], users: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_SET:
      return {
        ...state,
        playlistId: action.payload,
      };
    case PLAYLIST_SONG_ADD:
      return {
        ...state,
        songs: [...state.songs, action.payload],
      };
    case PLAYLIST_SONG_REMOVE:
      return {
        ...state,
        songs: state.songs.filter((song) => song.title != action.payload.title),
      };

    case PLAYLIST_USER_ADD:
      if (!state.users.includes(action.payload.userId)) {
        return {
          ...state,
          users: [...state.users, action.payload.userId],
        };
      } else {
        return { ...state };
      }

    case PLAYLIST_USER_REMOVE:
      return {
        ...state,
        users: state.users.filter((uid) => uid != action.payload.userId),
      };

    default:
      return state;
  }
}
