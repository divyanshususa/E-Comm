import { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();
const getLocalCartData = () => {
  let localCartData = JSON.parse(localStorage.getItem("ourCart"));
  console.log(localCartData);

  if (localCartData === null) {
    return [];
  } else {
    return localCartData;
  }
};
const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  total_item: "", // It might be better to initialize numbers as 0
  total_amount: 0, // Same here
  total_price: 0,
  shipping_fee: 500,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (_id, quantity, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { _id, quantity, product } });
  };
  const setDecrease = (_id) => {
    dispatch({ type: "SET_DECREMENT", payload: _id });
  };

  const setIncrease = (_id) => {
    dispatch({ type: "SET_INCREMENT", payload: _id });
  };

  // to remove the individual item from cart
  const removeItem = (_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: _id });
  };
  //to add the data in local storage
  //get vs set
  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    localStorage.setItem("ourCart", JSON.stringify(state.cart));
  }, [state.cart]);

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        setDecrease,
        setIncrease,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext); // Corrected to useContext to access CartContext
};

export { CartProvider, useCartContext };
