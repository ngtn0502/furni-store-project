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
      filtered__products: [
        ...action.payload.sort((a, b) => {
          return a.price - b.price;
        }),
      ],
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

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

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

  //   if (action.type === UPDATE_SORT) {
  //     let tempFilter = [...state.filtered__products];
  //     if (action.payload === "highest") {
  //       tempFilter.sort((a, b) => {
  //         return b.price - a.price;
  //       });
  //     }
  //     if (action.payload === "lowest") {
  //       tempFilter.sort((a, b) => {
  //         return a.price - b.price;
  //       });
  //     }
  //     if (action.payload === "a-z") {
  //       tempFilter.sort((a, b) => {
  //         if (a.name < b.name) {
  //           return -1;
  //         }
  //         if (a.name > b.name) {
  //           return 1;
  //         }
  //         return 0;
  //       });
  //     }
  //     if (action.payload === "z-a") {
  //       tempFilter.sort((a, b) => {
  //         if (a.name < b.name) {
  //           return 1;
  //         }
  //         if (a.name > b.name) {
  //           return -1;
  //         }
  //     return 0;
  //   });
  // }
  // return {
  //     //   ...state,
  //     //   filtered__products: tempFilter,
  //     // };
  //   }
  return state;
};

export default filteredReducer;
