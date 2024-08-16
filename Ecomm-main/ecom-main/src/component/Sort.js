import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/filter_context";
const Sort = () => {
  const { filter_products, grid_view, setGridView, setListView, sorting } =
    useFilterContext();
  return (
    <Wrapper className="sort-section">
      {/* ist column */}
      <div className="sorting-list--grid">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}
        >
          {/* console.log(" ~ file:Sort.js ~ line 14 ~ setGridView ~ ",setGridView) */}
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={grid_view ? "sort-btn" : "active sort-btn"}
          onClick={setListView}
        >
          <BsList className="icon" />
        </button>
      </div>
      {/* 2nd column */}
      <div className="product-data">
        <p>{`${filter_products.length} Products Available`} </p>
      </div>
      {/* 3rd column */}
      <p>
        <div className="sort-selection">
          <form action="#">
            <label htmlFor="sort"></label>
            <select
              name="sort"
              id="sort"
              className="sort-selection--style"
              onClick={sorting}
            >
              <option value="lowest">Price(lowest)</option>
              <option value="#" disabled></option>
              <option value="highest">Price(highest)</option>
              <option value="#" disabled></option>
              <option value="a-z">Price(a-z)</option>
              <option value="#" disabled></option>
              <option value="z-a">Price(z-a)</option>
            </select>
          </form>
        </div>
      </p>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Ensure items are vertically centered */
  margin-top: 0rem;
  margin-bottom:0%rem;
  padding: 5rem; /* Add some padding around the items */
  // background-color:#DDE0E3;//FEFEFE;//FEFEFE;//#004225; /* Set the background color to blue */

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background-color:white; /* Smooth transition for hover effect */

      &:hover {
        background-color: gray; /* Slightly darken the button on hover */
      }
    }

    .icon {
      font-size: 1.6rem;
      color:black
    }
    .active {
      background-color: #fff; /* Active button background */
      color: black; /* Active button text color to contrast with the background */
    }
  }

  .sort-selection {
    color:#FEFEFE;
    .sort-selection--style {
      padding: 0.5rem;
      cursor: pointer;
    }
  }
  
  /* Adjustments for responsiveness if needed */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch; /* Make child elements stretch to full width on smaller screens */
    gap: 1rem; /* Add some space between the elements when stacked */
  }
`;

export default Sort;
