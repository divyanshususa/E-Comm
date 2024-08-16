const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.aprice);

      let maxPrice = Math.max(...priceArr);

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, aprice: maxPrice },
      };
    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };
    case "GET_SORT_VALUE":
      let userSortValue = document.getElementById("sort");
      //below line is defining the current selected option
      let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      // console.log(sort_value)
      return {
        ...state,
        sorting_value: sort_value,
      };
    case "SORTING_PRODUCTS":
      // console.log("Sorting products", state.sorting_value);
      if (state.sorting_value === "a-z") {
        let sortedProducts = [...action.payload].sort((a, b) => {
          const nameA = a.pname.toUpperCase();
          const nameB = b.pname.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;

          //     a.name.localeCompare(b.name),
          //    console.log(a.name,b.name)
        });

        return {
          ...state,
          filter_products: sortedProducts,
        };
      }
      if (state.sorting_value === "z-a") {
        let sortedProducts = [...action.payload].sort((a, b) => {
          const nameA = a.pname.toUpperCase();
          const nameB = b.pname.toUpperCase();

          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;

          //     a.name.localeCompare(b.name),
          //    console.log(a.name,b.name)
        });

        return {
          ...state,
          filter_products: sortedProducts,
        };
      }
      if (state.sorting_value === "lowest") {
        // console.log("Sorting products", state.sorting_value);
        // Sort products by price in ascending order (lowest to highest)
        let sortedProducts = [...action.payload].sort(
          (a, b) => a.aprice - b.aprice
        );

        return {
          ...state,
          filter_products: sortedProducts,
        };
      }
      if (state.sorting_value === "highest") {
        // console.log("Sorting products", state.sorting_value);
        // Sort products by price in descending order (highest to lowest)
        let sortedProducts = [...action.payload].sort(
          (a, b) => b.aprice - a.aprice
        );

        return {
          ...state,
          filter_products: sortedProducts,
        };
      }

    case "FILTER_PRODUCTS": {
      const { all_products } = state;
      const { text, pcat, aprice } = state.filters; // Ensure `pcat` is correctly initialized in your state.
      let tempFilterProduct = [...all_products];

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((product) =>
          product.pname.toLowerCase().includes(text.toLowerCase())
        );
        tempFilterProduct = tempFilterProduct.filter((product) =>
          product.pname.toLowerCase().includes(text.toLowerCase())
        );
      }

      // Filter by category
      // if (pcat && pcat !== "all") { // Assuming 'all' means no category filter is applied.
      //     tempFilterProduct = tempFilterProduct.filter((product) =>
      //         product.pcat === pcat
      //     );

      // Filter by category if a specific category is selected (and not "All")
      if (pcat && pcat !== "All") {
        tempFilterProduct = tempFilterProduct.filter(
          (product) => product.pcat === pcat
        );
      }
      if (aprice) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.aprice <= aprice
        );
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
        ...state,
        filter_products: tempFilterProduct,
      };
    }
    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value, // This updates the text filter with the input's value
        },
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          pcat: "All",
          maxPrice: 0,
          aprice: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };
    default:
      return state;
  }
};
export default filterReducer;
