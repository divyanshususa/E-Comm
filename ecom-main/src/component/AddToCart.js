import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";
import UserService from "../Services/UserService";

const AddToCart = ({ product }) => {
  const [data, setData] = useState({
    pid: "",
    cid: "",
    quantity: null,
  });

  const service = UserService();
  const { addToCart } = useCartContext();
  const { _id, quantity } = product;

  const [amount, setAmount] = useState(1);
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const setIncrease = () => {
    amount < quantity ? setAmount(amount + 1) : setAmount(quantity);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    console.log("user", user);
    setData({
      cid: user._id,
      pid: _id,
      quantity: quantity,
    });
  }, []);

  return (
    <Wrapper>
      {/* AddToCart */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      <NavLink
        to="/cart"
        //the product is the single product you can see addtocart.js
        onClick={() => {
          addToCart(_id, amount, product);
        }}
      >
        <div className="d-flex justify-content-center">
          <Button className="btn "> Add To Cart</Button>
        </div>
      </NavLink>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
  }
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;
