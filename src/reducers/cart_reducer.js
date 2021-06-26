import { ADD_TO_CART } from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    return { ...state, amountCart: state.amountCart + action.payload };
  }
  return state;
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
