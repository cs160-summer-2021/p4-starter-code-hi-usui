import { USERS_SET_CURRENT } from "actions/types";

const initialState = { currentUser: null };

export default function (state = initialState, action) {
  switch (action.type) {
    case USERS_SET_CURRENT:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
