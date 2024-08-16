import React from "react";
import Product from "../Product";
import { useProductContext } from "../../context/Productcontext";
import { useSelector } from "react-redux";

const SearchItem = () => {
  const { products } = useProductContext();
  const currency = useSelector(state => state.currency);
  console.log(currency);
  return (
    <div>
      <div className="container mt-5">
        <div className="grid grid-four-column">
          {products &&
            products.map((curElem) => {
              return <Product key={curElem.id} {...curElem} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
