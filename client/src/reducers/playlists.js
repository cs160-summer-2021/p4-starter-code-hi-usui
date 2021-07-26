import { PLAYLIST_NEW } from "actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_NEW:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
