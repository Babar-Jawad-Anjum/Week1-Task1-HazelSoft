import { IS_LOGGED } from "../constants/action-types";

const initialState = false;

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED:
      return !state;
    default:
      return state;
  }
};
