import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/main_reducer";
import {
  products_url as url,
  single_product_url as s_url,
} from "../utils/constants";
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

const initialState = {
  isSideBarOpen: false,
  products: [],
  featured__products: [],
  products__isLoading: false,
  products__error: false,
  singleProducts: {},
  singleProducts__isLoading: false,
  singleProducts__error: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // For handle side bar
  const sideBarOpenHandler = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const sideBarCloseHandler = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  // For handle fetch all Products data
  const fetchData = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  useEffect(() => {
    fetchData(url);
  }, []);

  // For handle fetch single product data and pass it down to the single product page

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  // Pass every value after dispatching to the nested component
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        sideBarOpenHandler,
        sideBarCloseHandler,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
