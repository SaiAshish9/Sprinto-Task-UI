import { UPDATE_ACTIVE_USER, UPDATE_USERS } from "./types";

export const initialState = {
  users: null,
  user: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case UPDATE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UPDATE_ACTIVE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
