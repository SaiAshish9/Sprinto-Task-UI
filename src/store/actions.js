import { UPDATE_ACTIVE_USER, UPDATE_USERS } from "./types";

export default function useActions(state, dispatch) {
  const updateUsers = (user) => dispatch({ type: UPDATE_USERS, payload: user });
  const updateUser = (user) => dispatch({ type: UPDATE_ACTIVE_USER, payload: user });

  return { updateUsers, updateUser };
}
