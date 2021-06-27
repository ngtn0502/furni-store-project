import { ADD_TO_CART } from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    let temp = [...state.cart];
    let index = state.cart.findIndex(
      (item) => action.payload.products === item
    );
    if (index === -1) {
      temp.push(action.payload.products);
      const index = temp.length - 1;
      temp[index].item = 1;
    } else {
      temp[index].item += action.payload.amountCart;
    }
    const totalAmount = temp.reduce((acc, item) => {
      acc = acc + item.item * item.price;
      return acc;
    }, 0);
    return {
      ...state,
      total__item: state.total__item + action.payload.amountCart,
      cart: temp,
      total__amount: totalAmount,
    };
  }
  return state;
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
