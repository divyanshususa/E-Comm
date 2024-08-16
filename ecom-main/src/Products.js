import React from "react";
import FilterSection from "./component/FilterSection";
import ProductList from "./component/ProductList";
import Sort from "./component/Sort";
import styled from "styled-components";
import { useFilterContext } from "./context/filter_context";
const Products = () => {
  // // const {filter_products}= useFilterContext()
  // console.log("~ file:Product.js ~ line 9 ~ Products ~ filter_products",filter_products)
  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
        
          <FilterSection />
        </div>
        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList />
            
          </div>
        </section>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
  }
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

?
`;

export default Products;
