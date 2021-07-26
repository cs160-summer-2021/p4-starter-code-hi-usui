import { PLAYLIST_SET, PLAYLIST_USER_CONNECT } from "actions/types";

const initialState = { playlistId: null, users: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_SET:
      return {
        ...state,
        playlistId: action.payload,
      };
    case PLAYLIST_USER_CONNECT:
      return {
        ...state,
        users: [...state.users, { ...action.payload }],
      };
    default:
      return state;
  }
}
