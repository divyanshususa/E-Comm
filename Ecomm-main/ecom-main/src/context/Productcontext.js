import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";
import UserService from "../Services/UserService";

const service = UserService();

const AppContext = createContext();

const API = "https://swiftmart-416707.el.r.appspot.com/api/products/getallproducts";

const initialState = {
  //isLoading is an object
  isLoading: false,
  isError: false,
  //products is a data array taht cwill contain all products
  //feature Product is the array that will contain feature data
  //singleProduct is a single empty object
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
  searchedProducts: {},
};
const AppProvider = ({ children }) => {
  //useReducer return two elements of an array in which first is state second is dispatch,and you can write any thing below in place of state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    //res is random name given by me which represent response, (whenever we call api that give us some response)
    // when we use axios it return us a promise then to handle this we use simple promises like .then or .catch etc but to simplify it we use async awaitd
    try {
      const res = await axios.get(url);
      const products = await res.data;
      // console.log(" ~ file: productcontext.js ~ line 13 `getProducts ~ products",products)
      // dispatch schedule work and tell which resources are needed to do that work
      //payload means data ,(to do this  work which data  you need  )
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" }); //IF DATA IS FOUND OR MAY BE URL IS WRONG
      //whatever the task is assigned to the dispatch,then  dispatch will call the action method of reducer function
    }
  };

  const getSearched = async (query) => {
    dispatch({ type: "SET_LOADING" });

    try {
      console.log(query);
      const res = await service.getsearch(query);
      const products = res.products;
      console.log(products);

      dispatch({ type: "SET_SEARCHED_PRODUCTS", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  //predefined hook(useEffect)
  // my 2nd api call fro single product
  //single product data is coming in singleproduct
  //before that we have to show loading so  we used SET_SINGLE_LOADING then after laoding error might happen then SET_SINGLE_ERROR is used

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);
  return (
    //.. is spread oprator h and state is an variable it means whatever is our initialdata is  added to here
    <AppContext.Provider value={{ ...state, getSingleProduct, getSearched }}>
      {children}
    </AppContext.Provider>
  );
};

//custom hook
//useProductContext is random name selected not any fixed and not  according to video  it can be named randomly
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
