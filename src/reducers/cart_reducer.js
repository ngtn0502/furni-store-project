import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { amountCart, products, mainColor, id } = action.payload;
    const tempItem = state.cart.find((item) => {
      return item.id === id + mainColor;
    });
    if (tempItem) {
      // Create new updated array - hold all value of old array and over write the amount of object that already exist
      const temp = state.cart.map((product) => {
        if (product.id === id + mainColor) {
          let newAmount = product.item + amountCart;
          if (newAmount > product.max) {
            newAmount = product.max;
          }
          return { ...product, item: newAmount };
        } else {
          return product;
        }
      });
      //
      // Return all the state and over write the cart in every render
      return {
        ...state,
        cart: temp,
      };
    } else {
      // Create new array if it does not exist in the CART

      const newItem = {
        id: id + mainColor,
        color: mainColor,
        image: products.images[0].url,
        name: products.name,
        price: products.price,
        item: amountCart,
        max: products.stock,
      };
      // Create newItem object in the cart
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const { id } = action.payload;
    console.log(id);
    const temp = state.cart.filter((product) => {
      return product.id !== id;
    });
    console.log(temp);

    return { ...state, cart: temp };
  }

  if (action.type === CLEAR_CART) {
    return {
      cart: [],
      total__item: 0,
      total__amount: 0,
      shippingFee: 1000,
    };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    let temp;
    if (action.payload[0]) {
      temp = state.cart.map((product) => {
        if (product.id === action.payload[1]) {
          if (product.item >= product.max) {
            return { ...product, item: product.max };
          } else {
            return { ...product, item: product.item + 1 };
          }
        } else {
          return product;
        }
      });
    } else {
      temp = state.cart.map((product) => {
        if (product.id === action.payload[1]) {
          if (product.item < 1) {
            return { ...product, item: 0 };
          }
          return { ...product, item: product.item - 1 };
        } else {
          return product;
        }
      });
      temp = temp.filter((item) => item.item != 0);
    }
    return {
      ...state,
      cart: temp,
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total__amount, total__item } = state.cart.reduce(
      (obj, product) => {
        obj.total__amount += product.item * product.price;
        obj.total__item += product.item;
        return obj;
      },
      { total__amount: 0, total__item: 0 }
    );

    return { ...state, total__amount, total__item };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
