import React, { useContext, useReducer } from "react";

import reducer, { initialState } from "./reducer";
import useActions from "./actions";

const Store = React.createContext();

export function StoreProvider(props) {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);
  const value = { state, dispatch, actions };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

export const useStore = () => useContext(Store);

export const context = initialState;
