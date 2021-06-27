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
  // Dispatch load products action
  if (action.type === LOAD_PRODUCTS) {
    const priceList = action.payload.map((item) => {
      return item.price;
    });
    const maxValue = Math.max(...priceList);
    return {
      ...state,
      all__products: [...action.payload],
      filtered__products: [...action.payload],
      filter: { ...state.filter, max__price: maxValue, price: maxValue },
    };
  }
  // Dispatch set grid and list products view (conditional rendering)
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
  // Dispatch sorting action
  // Receive the value wanna sort
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  // Sort action
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered__products } = state;
    let tempSort = [...filtered__products];
    if (sort === "highest") {
      tempSort = tempSort.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (sort === "lowest") {
      tempSort = tempSort.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (sort === "a-z") {
      tempSort = tempSort.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }

    if (sort === "z-a") {
      tempSort = tempSort.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }
    return { ...state, filtered__products: tempSort };
  }
  // Dispatch filter search text input
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filter: { ...state.filter, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    console.log("it worked");
    return { ...state };
  }

  return state;
};

export default filteredReducer;
