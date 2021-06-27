import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const initialState = {
  cart: [],
  total__item: 0,
  total__amount: 0,
  shippingFee: 1000,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const amountCartHandler = ({ amountCart, products }) => {
    dispatch({ type: ADD_TO_CART, payload: { amountCart, products } });
  };
  return (
    <CartContext.Provider
      value={{
        ...state,
        amountCartHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};
