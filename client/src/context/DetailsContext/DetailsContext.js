import { createContext, useReducer, useEffect } from "react";
import { detailsReducer } from "../../reducers/DetailsReducer/DetailsReducer";
import axios from "axios";
import { GET_USER_DETAILS } from "../../reducers/DetailsReducer/actionTypes";

const INITIAL_STATE = [];

export const DetailsContext = createContext();

export const DetailsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(detailsReducer, INITIAL_STATE);

  useEffect(() => {
    axios
      .get("/")
      .then(({ data }) => dispatch({ type: GET_USER_DETAILS, payload: data }))
      .catch((error) => console.log(error.message));
  }, [state]);

  return (
    <DetailsContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
