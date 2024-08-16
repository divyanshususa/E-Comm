import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import CartItem from "./component/CartItem";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./styles/Button";

import FormatPrice from "./Helpers/FormatPrice";

const Cart = ({ setcart }) => {
  const navigate = useNavigate();
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  // console.log("~ file: Cart.js ~ line 6 ~ Cart ~ cart",cart);

  const handlePlaceOrder = () => {
    setcart({
      data: cart,
      totalAmount: total_price,
    });
    navigate("/user/checkout");
    // history.push('/user/checkout', { cartData: cart, total: shipping_fee + total_price });
  };
  console.log("Cart items:", cart);
  if (cart.length === 0) {
    return (
      <EmptyDiv>
        <h3>No Cart in Item </h3>
      </EmptyDiv>
    );
  }
  return (
    <Wrapper>
      <div className="container">
        <div className="cart-heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem._id} {...curElem} />;
          })}
        </div>
        <hr />
        <div className="cart-two-button">
          <button className="btn btn-clear " onClick={handlePlaceOrder}>
            Checkout
          </button>
          <NavLink to="/products">
            <button className="btn btn-clear "> Continue Shopping </button>
          </NavLink>
          <button className="btn btn-clear" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        {/* order total_amount */}
        {/* <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>subtotal:</p>
              <p>
                <FormatPrice price={total_price} />
              </p>
            </div>
            <div>
              <p>shipping fee:</p>
              <p>
                <FormatPrice price={shipping_fee} />
              </p>
            </div>
            <hr />
            <div>
              <p>order total:</p>
              <p>
                <FormatPrice price={shipping_fee + total_price} />
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;
const Wrapper = styled.section`
   padding: 9rem 0;
  
// .container {
//   background-color: #f9f9f9;//#fadbc0f0//#e0995e7d ;//#f9f9f9; /* Light grey background, you can choose any color */
//   padding: 1rem; /* Adds padding inside the container */
//   border: 0px solid #653239; /* Light grey border */
//   box-shadow: 0 4px 6px rgba(0, 0, 1, 1); /* Subtle shadow */
//   margin:0rem,0rem; /* Centers the container */
//   width: 100%; /* Adjust the width as needed */
//   height:80%;
//   max-width: 1500px; /* Ensures the container does not stretch too much on larger screens */
//   max-height: 1300px;
// }

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
 
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 0rem;
    display: flex ;
    flex-direction: column;
    gap: 1.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1.4fr 1fr;
    text-transform: uppercase;
    text-align: left;
  
    img {
      max-width: 10rem;
      width:8rem;
      height:8rem;
      max-height: 10rem;
      object-fit: contain;
      color: transparent;
    }

   
    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    gap: 2rem;
    justify-content:flex-end ;
    
    .shop-button {
      color: white
      background-color: #062D55;
      // width: 15rem;
      white-space:nowrap
      margin-left:11rem;
    } 

    .btn-clear {
      color:white;
      background-color: #062D55;
      width: 10rem;
      margin-right:11rem;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3.4rem;
    font-size: 1.4rem;
    background-color:#e8fff1;

    button {
      border: none;
     // width: 5rem;;
     // height:5rem;
      background-color: #e8fff1;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.8rem;
      color: black;
      background-color:#e8fff1;
    }
  }

  .remove_icon {
    font-size: 3.6rem;
    color: black;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .order-total--subdata {
      border: 0rem solid  #653239;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
      box-shadow:10px;
      width:80%;
     
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      height:40%;
      // background-color: #E2FAFC;
    }

    div p:last-child {
      font-weight: bold;
      color: black;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;
