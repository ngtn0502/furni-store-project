import React, { useContext, useEffect, useReducer } from "react";
import filteredReducer from "../reducers/filter_reducer";
import { useProductsContext } from "./main_context";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
const initialState = {
  all__products: [],
  filtered__products: [],
  view__type: true,
};

const FilterContext = React.createContext();

export const FilterProvider = (props) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filteredReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  const gridViewHandler = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const listViewHandler = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, gridViewHandler, listViewHandler }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
