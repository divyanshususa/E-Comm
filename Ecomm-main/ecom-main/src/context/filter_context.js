import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./Productcontext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "",
  filters: {
    text: "",
    pcat: "All",
    maxPrice: 0,
    aprice: 0,
    minPrice: 0,
  },
};
export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  //to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };
  // to set listview
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    return dispatch({ type: "GET_SORT_VALUE" });
  };

  //update the filter value

  const updateFilterValue = (event) => {
    const { name, value } = event.target; // 'name' should be 'text' for the search input
    dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  useEffect(() => {
    let filteredProducts = state.all_products;

    // Filter by text
    if (state.filters.text) {
      filteredProducts = filteredProducts.filter((product) =>
        product.pname.toLowerCase().includes(state.filters.text.toLowerCase())
      );
    }

    // Update the state with the filtered products
    dispatch({ type: "FILTER_PRODUCTS", payload: filteredProducts });
  }, [state.filters, state.all_products]);

  //    to sort the product
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS", payload: products });
    dispatch({ type: "SORTING_PRODUCTS", payload: products });
  }, [products, state.sorting_value, state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
export const useFilterContext = () => {
  return useContext(FilterContext);
};
