import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToWishlist } from "../../../features/wishlistSlice";
import Button from "react-bootstrap/Button";

const MyWishlist = ({ wishlistData }) => {
  const { wishlist } = useSelector((state) => state.allWishlist);
  const dispatch = useDispatch();

  const removeFromWishlist = (product) => {
    dispatch(removeToWishlist(product));
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <span
              className="iconify"
              data-icon="uil:heart"
              style={{ marginRight: "10px", marginBottom: "4px" }}
            ></span>
            Shopping Wishlist
          </h4>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 bg-white mt-3">
        <div className="pdpt-bg">
          <div className="wishlist-body-dtt">
            {console.log("--->", wishlist)}

            {wishlist.length === 0 ? (
              <div className="cart-empty">
                <i className="fa fa-shopping-cart"></i>
                <p>Your wishlist is Empty</p>
              </div>
            ) : (
              wishlist?.map((product) => (
                <div
                  key={product._id}
                  className="cart-item mt-3 grid grid-two-column "
                >
                  <div className="cart-product-img">
                    <img
                      src={product.pphoto}
                      alt=""
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div className="cart-text">
                    <div className="offer-badge">
                      {((product.aprice - product.dprice) / product.aprice) *
                        100}
                      % Off
                    </div>
                    <h4>{product.pname}</h4>
                    <div className="cart-item-price">
                      {product.dprice?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}{" "}
                      <span>
                        {product.aprice?.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </div>
                    <Button
                      onClick={() => removeFromWishlist(product)}
                      className="btn btn-danger "
                      // style={{width: '30%', height:'20%'}}
                    >
                      Remove
                      {/* <span className="iconify" data-icon="uil:trash-alt"></span> */}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
