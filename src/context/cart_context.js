import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const getLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total__item: 0,
  total__amount: 0,
  shippingFee: 1000,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // When click to cart btn
  const amountCartHandler = ({ amountCart, products, mainColor, id }) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { amountCart, products, mainColor, id },
    });
  };
  // Remove item from cart
  const removeItemHandler = (id) => {
    console.log(id);
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
  };
  // Toggle amount

  const toggleAmountHandler = (...arr) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: arr });
  };

  // Clear cart
  const clearCartHandler = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        amountCartHandler,
        removeItemHandler,
        clearCartHandler,
        toggleAmountHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};
