const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const { _id, quantity, product } = action.payload;

    // Check if the product is already in the cart
    const existingProductIndex = state.cart.findIndex(
      (item) => item._id === _id
    );
    let updatedCart = [...state.cart];

    if (existingProductIndex >= 0) {
      // Product exists, update quantity
      const existingProduct = updatedCart[existingProductIndex];
      let newQuantity = existingProduct.quantity + quantity;

      // Ensure new quantity does not exceed available stock
      if (newQuantity > product.quantity) {
        newQuantity = product.quantity; // Set to max stock available
      }

      const updatedProduct = {
        ...existingProduct,
        quantity: newQuantity, // Updated quantity, capped at stock available
      };
      updatedCart[existingProductIndex] = updatedProduct;
    } else {
      // Adjust quantity for new product if initial quantity exceeds stock
      const adjustedQuantity =
        quantity > product.quantity ? product.quantity : quantity;

      // Product does not exist, add to cart with adjusted quantity
      updatedCart.push({
        _id,
        quantity: adjustedQuantity,
        productDetails: product,
      });
    }

    // Calculate new total item and total amount
    const newTotalItem = updatedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const newTotalAmount = updatedCart.reduce(
      (acc, item) => acc + item.productDetails.aprice * item.quantity,
      0
    );

    return {
      ...state,
      cart: updatedCart,
      total_item: newTotalItem,
      total_amount: newTotalAmount,
    };
  }

  //to empty or clear the
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  //to set increment
  if (action.type === "SET_INCREMENT") {
    let updatedCart = state.cart.map((item) => {
      // Check if this is the item to update
      if (item._id === action.payload) {
        // Calculate the new quantity, ensuring not to exceed available stock
        let newQuantity = Math.min(
          item.quantity + 1,
          item.productDetails.quantity
        );

        // Update and return the new item
        return { ...item, quantity: newQuantity };
      }
      // For items not being updated, return them as they are
      return item;
    });

    // Return the updated state
    return { ...state, cart: updatedCart };
  }

  //to set decrement
  if (action.type === "SET_DECREMENT") {
    let updatedCart = state.cart.map((item) => {
      if (item._id === action.payload) {
        // Use _id for identification
        let decQuantity = item.quantity - 1;

        if (decQuantity < 1) {
          decQuantity = 1; // Ensure quantity does not go below 1
        }

        return {
          ...item,
          quantity: decQuantity, // Update the quantity
        };
      } else {
        return item;
      }
    });

    return { ...state, cart: updatedCart };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem._id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CART_TOTAL_ITEM") {
    let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
      // Ensure quantity is a number; if not, default to 0
      let quantity = Number(curElem.quantity) || 0;

      // Add the quantity to the initial value
      initialVal += quantity;
      return initialVal;
    }, 0);

    return {
      ...state,
      total_item: updatedItemVal,
    };
  }

  if (action.type === "CART_TOTAL_PRICE") {
    let total_price = state.cart.reduce((accumulatedTotal, currentItem) => {
      // Extract the relevant properties from the current item
      const { aprice, quantity } = currentItem;

      // Convert to numbers to ensure proper arithmetic operations, defaulting to 0 if not available or parseable
      const itemPrice = Number(aprice) || 0;
      const itemQuantity = Number(quantity) || 0;

      // Calculate the subtotal for the current item and add it to the accumulated total
      const itemSubtotal = itemPrice * itemQuantity;

      return accumulatedTotal + itemSubtotal;
    }, 0); // Start accumulating from 0

    return {
      ...state,
      total_price, // Update the total price in the state
    };
  }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    let { total_item, total_price } = state.cart.reduce(
      (accum, curElem) => {
        console.log("current element", curElem);
        // let { aprice, quantity} = curElem;
        let aprice = Number(curElem.productDetails.aprice);
        let quantity = Number(curElem.quantity);
        accum.total_item += quantity;
        accum.total_price += aprice * quantity;
        console.log(aprice, quantity);
        return accum;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );
    return {
      ...state,
      total_item,
      total_price,
    };
  }
  // Always return state by default
  return state;
};

export default cartReducer;
