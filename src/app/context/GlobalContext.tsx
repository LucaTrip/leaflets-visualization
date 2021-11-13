/**
 * This is the global Context that permit me to share the data to the children
 */
import React, { createContext, Dispatch, useReducer } from "react";

import { ActionMap, Types } from "../utils/reducers";

interface InitialStateType {
  offset: number;
  limit: number | undefined;
  name: string | undefined;
  excludeExpired: number | undefined;
  maxDistance: number | undefined;
  sort: string;
}

interface CustomContext {
  state: InitialStateType;
  dispatch: Dispatch<GlobalActions>;
}

type GlobalPayload = {
  [Types.change_max_distance]: {
    value: number;
  };
  [Types.change_sort]: {
    value: number;
  };
  [Types.change_limit]: {
    value: number;
  };
  [Types.change_name]: {
    value: string;
  };
};

export type GlobalActions =
  ActionMap<GlobalPayload>[keyof ActionMap<GlobalPayload>];

const initialState: InitialStateType = {
  offset: 0,
  limit: 30,
  name: "",
  excludeExpired: 1,
  maxDistance: 0,
  sort: "priority",
};

const defaultDispatch: Dispatch<GlobalActions> = () => null;

const GlobalContext = createContext<CustomContext>({
  state: initialState,
  dispatch: defaultDispatch,
});

const globalReducer = (state: InitialStateType, action: GlobalActions) => {
  switch (action.type) {
    case Types.change_max_distance:
      return { ...state, maxDistance: action.payload!.value };

    case Types.change_sort:
      return {
        ...state,
        sort: action.payload!.value === -1 ? "-priority" : "priority",
      };

    case Types.change_limit:
      return {
        ...state,
        limit: action.payload!.value,
      };

    case Types.change_name:
      return {
        ...state,
        name: action.payload!.value,
      };

    default:
      return state;
  }
};

const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
