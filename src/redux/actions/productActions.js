import * as actionTypes from "../constants/action-types";

export const setAllProducts = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    payload: products,
  };
};
export const setCategoryProducts = (products) => {
  return {
    type: actionTypes.SET_CATEGORIZED_PRODUCTS,
    payload: products,
  };
};

export const setCategories = (categories) => {
  return {
    type: actionTypes.SET_CATEGORIES_LIST,
    payload: categories,
  };
};

export const setSelectedProduct = (product) => {
  return {
    type: actionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const removeSelectedProduct = () => {
  return {
    type: actionTypes.REMOVE_SELECTED_PRODUCT,
  };
};
