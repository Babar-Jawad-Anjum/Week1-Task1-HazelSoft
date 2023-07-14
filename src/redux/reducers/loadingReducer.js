import { IS_LOADING } from "../constants/action-types";

const initialState = false;

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return !state;
    default:
      return state;
  }
};
