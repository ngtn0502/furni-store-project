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
  sort: "lowest",
  filter: {
    name: "",
    category: "all",
    company: "all",
    color: "all",
    min__price: 0,
    max__price: 0,
    price: 0,
    free__shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = (props) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filteredReducer, initialState);

  // handle loading products from main context
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);
  // handle sorting products
  // handle filtering products
  // dependence for filter and sort
  // In that useEffect => list of products after filtering => it will be sorted and render to the screen
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [state.sort, products, state.filter]);

  const setGridViewHandler = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListViewHandler = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const sortChangeHandler = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const filterChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.dataset.value;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "free__shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilterHandler = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridViewHandler,
        setListViewHandler,
        sortChangeHandler,
        filterChangeHandler,
        clearFilterHandler,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
