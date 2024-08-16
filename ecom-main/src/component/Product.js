import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";

import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useProductContext } from "./../context/Productcontext";

import { addToCart } from "../features/cartSlice";
import { addToWishlist } from "../features/wishlistSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSelection from "antd/es/table/hooks/useSelection";

const API = "http://localhost:5000/api/products/details";

const Product = (curElem) => {
  console.log(curElem);
  const { _id, pname, pphoto, aprice, pcat, dprice } = curElem;
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  //  const[pid, setPid]= useState();
  const { currencyType } = useSelector(state => state.currency);
  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(addToCart(e));
    console.log("when added", e);
    toast.success("Item added In Your Cart");
  };

  const addWishlist = (e) => {
    dispatch(addToWishlist(e));
    toast.success("Item added In Your wishlist");
  };

  useEffect(() => {
    getSingleProduct(`${API}?id=${_id}`);
  }, []);
  return (
    <div>
      <div className="product-card cursor-pointer">
        <div className="product-card-img">
          <label className="stock bg-success">In Stock</label>

          <img
            src={pphoto}
            alt="Laptop"
            className="w-full object-cover h-[300px] hover:scale-105 hover:duration-300"
          />
        </div>

        <div className="product-card-body">
          <NavLink to={`/singleproduct/${_id}`}>
            <p className="product-brand">{pcat}</p>
            <h5
              className="product-name"
              style={{ textTransform: "capitalize" }}
            >
              {pname}
            </h5>
            <div>
              <span className="selling-price">
                <FormatPrice price={dprice} type={currencyType} />
              </span>
              <span className="line-through text-[#937979] text-xl">
                <FormatPrice price={aprice} type={currencyType} />
              </span>
            </div>
          </NavLink>

          <div className="mt-2 d-flex" style={{ gap: "3px" }}>
            <button
              // style={{
              //   width: "120px",
              //   background: "#ff3054db",
              //   border: "none",
              // }}
              // variant="outline-light"
              className="mt-2 mb-2 bg-[#ff3054db] p-2 text-center text-white font-sans text-xl capitalize w-50"
              onClick={() => send(curElem)}
            >
              add to cart
            </button>
            <button
              // style={{
              //   width: "120px",
              //   background: "#ff3054db",
              //   border: "none",
              // }}
              // variant="outline-light"
              className="mt-2 mb-2 bg-[#ff3054db] p-2 text-center text-white font-sans text-xl capitalize w-50"
              onClick={() => addWishlist(curElem)}
            >
              add to wishlist
            </button>
            {/* <AddToCart  product={singleProduct}/> */}
            {/* <a href="" className="btn btn1">Add To Cart</a> */}
            {/* <a href="" className="btn btn1"> <i className="fa fa-heart"></i> </a> */}
            {/* <a href="" className="btn btn1"> View </a> */}
          </div>
        </div>
      </div>

      {/* <div className="card">
        <figure>
          <img src={pphoto} alt={pname} />
          <figcaption className="caption">{pcat}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{pname}</h3>
           
            <p className="card-data--price">{<FormatPrice price={aprice} />}</p>
           
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Product;
