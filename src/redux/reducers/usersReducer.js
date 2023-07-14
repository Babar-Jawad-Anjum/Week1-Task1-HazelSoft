import { SET_SELECTED_USER, SET_USERS } from "../constants/action-types";

const initialState = {
  users: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
export const selectedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_USER:
      return action.payload;
    default:
      return state;
  }
};
