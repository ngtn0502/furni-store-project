import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSideBarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSideBarOpen: false };
  }

  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products__isLoading: true };
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured__products = action.payload.filter(
      (item) => item.featured === true
    );
    return {
      ...state,
      products__isLoading: false,
      products: action.payload,
      featured__products,
      products__error: false,
    };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return {
      ...state,
      products__error: true,
    };
  }

  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, singleProducts__isLoading: true };
  }

  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      singleProducts__isLoading: false,
      singleProducts__error: false,
      singleProducts: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      singleProducts__error: true,
      singleProducts__isLoading: false,
    };
  }

  return state;
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
