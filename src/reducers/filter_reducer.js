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
  // Handle filter
  if (action.type === FILTER_PRODUCTS) {
    const { all__products } = state;
    // Get all the filter
    const { name, category, company, color, price, free__shipping } =
      state.filter;
    // Logic for filtering:
    // Copy all the default product to the temp variable after every re-render => after that i will filter that temp variable => return that variable for the filter product that display product to the UI
    // Cause i copy all the default products => so that i after every re-render => i do filter again => it does not run to the situation that run out of products (important part of filtering)
    // When work with filter text => remember to lowerCase all
    let tempProducts = [...all__products];
    // For filtering logical
    if (name) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(name);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.color === color;
      });
    }
    return { ...state, filtered__products: tempProducts };
  }

  // Clear filter
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filter: {
        ...state.filter,
        name: "",
        category: "all",
        company: "all",
        color: "all",
        price: state.filter.max__price,
        free__shipping: false,
      },
    };
  }
};

export default filteredReducer;
