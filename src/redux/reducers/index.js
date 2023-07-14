import { combineReducers } from "redux";
import {
  productCategoriesReducer,
  productsReducer,
  selectedProductReducer,
} from "./productReducer";
import { loadingReducer } from "./loadingReducer";
import { authReducer } from "./authReducer";
import { selectedUserReducer, usersReducer } from "./usersReducer";

const rootReducer = combineReducers({
  allProducts: productsReducer,
  selectedProduct: selectedProductReducer,
  allCategories: productCategoriesReducer,
  allUsers: usersReducer,
  selectedUser: selectedUserReducer,
  isLoading: loadingReducer,
  isLogged: authReducer,
});

export default rootReducer;
