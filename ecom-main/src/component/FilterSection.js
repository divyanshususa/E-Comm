import React, { useMemo } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";
const FilterSection = () => {
  const {
    filters: { text, pcat, aprice, maxPrice, minPrice },
    all_products,
    updateFilterValue,
    clearFilters,
  } = useFilterContext();

  //to get unique data of each field
  const getUniqueData = (data, property) => {
    let unique = data.map((curElem) => curElem[property]);
    console.log(unique);
    // If you want to ensure the values are unique, consider using a Set
    let uniqueSet = ["All", ...new Set(unique)];
    console.log(uniqueSet);
    return uniqueSet;
  };

  // we need unique data
  const categoryOnlyData = useMemo(() => {
    // Assuming getUniqueData is defined elsewhere and correctly implemented
    return getUniqueData(all_products, "pcat");
  }, [all_products]);

  return (
    <Wrapper>
      <div className="filter-search">
        <p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="text"
              placeholder="Search"
              value={text}
              onChange={updateFilterValue}
            />
          </form>
        </p>
      </div>
      <div className="filter-category">
        <h3>Category</h3>
        <div className="category-container">
          {categoryOnlyData.map((curElem, index) => (
            <button
              key={index}
              type="button"
              name="pcat" // Changed to "pcat" to match the property name you seem to be using.
              value={curElem} // Assuming curElem is the category you want to set as the value.
              onClick={updateFilterValue}
              className="category-button"
            >
              {curElem} {/* Display the category name on the button */}
            </button>
          ))}
        </div>
      </div>
      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={aprice} />
        </p>
        <input
          type="range"
          name="aprice"
          min={minPrice}
          max={maxPrice}
          value={aprice}
          onChange={updateFilterValue}
        />
      </div>
      <div className="filter-clear">
        <Button onClick={clearFilters}>clear Filters</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* Aligns children vertically */
  align-items: center; /* Centers children horizontally */
  gap: 20px; /* Optional: adds space between children */
  background-color: white; // /* Sets the background color of the column to black */
  color: white; /* Sets the text color to white for contrast */
  padding: 20px; /* Adds padding around the column */
  border-radius: 10px; /* Optional: adds rounded corners to the column */
  width: 100%; /* Adjust this as needed */
  max-width: 400px; /* Adjust based on preference */
  margin: auto; /* Centers the column if within a larger container */

  .container {
    background-color: white;
  }
  .filter-search,
  .filter-category,
  .filter_price,
  .filter-clear {
    width: 100%; /* Ensures each child takes full width of the parent */
  }

  input[type="text"],
  .category-button,
  input[type="range"] {
    width: 90%; /* Adjust based on preference */
    padding: 8px; /* Adds some padding inside inputs and buttons for better appearance */
    margin-bottom: 10px; /* Adds some space below each input/button */
    border: 1px solid #fff; /* Adds a white border for visibility */
    background-color: white; /* Dark background for inputs and buttons */
    color: black; /* Ensures text is white for visibility */
  }

  .category-button {
    cursor: pointer; /* Changes the cursor to a pointer when hovering over buttons */
    transition: background-color 0.3s ease; /* Smooth transition for background color change */
  }

  .category-button:hover {
    background-color: #555; /* Lightens the button on hover for feedback */
  }

  .filter-clear button {
    cursor: pointer;
    background-color: white; /* Example button color, adjust as needed */
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .filter-clear button:hover {
    background-color: gray; /* Darken button background on hover */
  }
`;

// Note: Adjust the CSS properties as per your design requirements

// Note: Adjust the CSS properties as per your design requirements

export default FilterSection;
