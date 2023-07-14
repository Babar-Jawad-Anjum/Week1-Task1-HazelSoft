import * as actionTypes from "../constants/action-types";

const productsInitialState = {
  products: [],
};

export const productsReducer = (state = productsInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case actionTypes.SET_CATEGORIZED_PRODUCTS:
      return { products: action.payload };
    default:
      return state;
  }
};
export const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SELECTED_PRODUCT:
      return action.payload;
    case actionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};
export const productCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES_LIST:
      return action.payload;
    default:
      return state;
  }
};
