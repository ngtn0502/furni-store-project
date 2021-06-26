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

const filteredReducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all__products: [...action.payload],
      filtered__products: [...action.payload],
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      view__type: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      view__type: false,
    };
  }
  return state;
};

export default filteredReducer;
