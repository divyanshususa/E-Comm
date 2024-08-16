import React from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";

const CartItem = ({ _id, quantity, productDetails }) => {
  const { pname, pphoto, aprice } = productDetails;
  console.log("CartItem props:", { _id, pname, pphoto, aprice, quantity });

  const { removeItem, setDecrease, setIncrease } = useCartContext();

  return (
    <div className="cart_heading grid grid-five-column">
      {/* Product Image and Name */}
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={pphoto} alt={_id} />
          </figure>
        </div>
        <div>
          <p>{pname}</p>
          {/* Removed color section since it's not provided in the new props */}
        </div>
      </div>
      {/* Product Price */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={aprice} />
        </p>
      </div>

      {/* Quantity Controls */}
      <CartAmountToggle
        amount={quantity}
        setDecrease={() => setDecrease(_id)}
        setIncrease={() => setIncrease(_id)}
      />

      {/* Subtotal (Price * Quantity) */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={aprice * quantity} />
        </p>
      </div>

      {/* Remove Item Button */}
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(_id)} />
      </div>
    </div>
  );
};

export default CartItem;
