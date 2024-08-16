import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Contact from "./Contact";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./component/Header";
import Footer from "./component/Footer";

import VendorPanel from "./component/Vendor/VendorPanel";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./component/AdminVendorLogin/Login";
import VendorSignup from "./component/AdminVendorLogin/VendorSignup";
import AddProduct from "./component/Vendor/Products/AddProduct";
import OrdersInvoice from "./component/Admin/Order/OrdersInvoice";
import OrderList from "./component/Admin/Order/OrderList";
import AddOfferComponent from "./component/Admin/Offers/AddOfferComponent ";
import AddCategory from "./component/Admin/Categories/AddCategory";
import AllCategories from "./component/Admin/Categories/AllCategories";
import OfferList from "./component/Admin/Offers/OffersList";

import Signup from "./component/User/Signup";
import Signin from "./component/User/Signin";

import AllOrders from "./component/Admin/Order/AllOrders";
import UserDashboard from "./component/User/Dashboard/UserDashboard ";
import SearchItem from "./component/User/SearchItem";
import Checkout from "./component/User/Checkout/Checkout";
import OrderPlaced from "./component/User/Orders/OrderPlaced";
import CartHome from "./component/cart/CartHome";
import CartDetails from "./component/cart/CartDetails";
import Overview from "./component/User/Overview/Overview";
import MyOrders from "./component/User/Orders/MyOrders";
import MyWishlist from "./component/User/Wishlist/MyWishlist";
import MyRewards from "./component/User/Rewards/MyRewards";
import MyAddress from "./component/User/Address/MyAddress";
import Dashboard from "./component/Admin/Dashboard";
import MainLayout from "./component/Admin/MainLayout";
import Customers from "./component/Admin/Customer/Customers";
import AllProducts from "./component/Admin/Products/AllProducts";
import OrderStatus from "./component/Admin/Order/OrderStatus.js";
// import RevenueData from './component/Admin/revenue/RevenueData.js'
import AdminAddProduct from "./component/Admin/Products/AdminAddProduct.js";
import AddCategoryComponent from "./component/Admin/Categories/AddCategoryComponent.js";
import { GiLava } from "react-icons/gi";
const App = () => {
  const theme = {
    colors: {
      heading: "",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgb(98 84 243,0.5)",
      hr: "#fffff",
      gradient:
        "linear-gradient(0deg,rgb(132 144 255) 0%,rgb(98 189 252) 100%)",
      shadow:
        "rgba(0,0,0,0.02) 0px 1px 3px 0px,rgba(27,31,35,0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0,0,0,0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "pp8px",
    },
  };

  const [cartdata, setcartdata] = useState({
    data: {},
    totalAmmount: null,
  });

  // const [qrdata, setQrdata] = useState({
  //   uid: "",
  //   vid: "",
  //   oid: "",
  // });

  const [orderdata, setorderdata] = useState();
  const [qrdata, setQrdata] = useState({
    uid: "",
    vid: "",
    oid: "",
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={
              <LayoutWithHeader>
                {/* <ProtectedRoutes Component={Home}/> */}
                <Home />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/about"
            element={
              <LayoutWithHeader>
                <About />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/products"
            element={
              <LayoutWithHeader>
                <Products />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/contact"
            element={
              <LayoutWithHeader>
                <Contact />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/singleproduct/:id"
            element={
              <LayoutWithHeader>
                <SingleProduct />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/product/:SearchItem"
            element={
              <LayoutWithHeader>
                <SearchItem />{" "}
              </LayoutWithHeader>
            }
          />
          {/* <Route path="/cart" element={<LayoutWithHeader><Cart setcart={setcartdata}/></LayoutWithHeader>} /> */}
          <Route
            path="/cart"
            element={
              <LayoutWithHeader>
                <CartDetails />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/signup"
            element={
              <LayoutWithHeader>
                <Signup />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/signin"
            element={
              <LayoutWithHeader>
                <Signin />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/user/checkout"
            element={
              <LayoutWithHeader>
                <Checkout
                  cartdata={cartdata}
                  setorderdata={setorderdata}
                  setQrdata={setQrdata}
                />
              </LayoutWithHeader>
            }
          />
          <Route
            path="/user/order-placed"
            element={
              <LayoutWithHeader>
                <OrderPlaced orderdata={orderdata} qrdata={qrdata} />
              </LayoutWithHeader>
            }
          />
          <Route
            path="*"
            element={
              <LayoutWithHeader>
                <ErrorPage />
              </LayoutWithHeader>
            }
          />
          {/* <Route path="/product" element={<LayoutWithHeader><CartHome/></LayoutWithHeader>} /> */}

          {/* user dashboard routes  */}

          <Route path="/user/dashboard" element={<UserDashboard />}>
            <Route index element={<Overview />} />
            <Route path="/user/dashboard/my-orders" element={<MyOrders />} />
            <Route
              path="/user/dashboard/my-wishlist"
              element={<MyWishlist />}
            />
            <Route path="/user/dashboard/my-rewards" element={<MyRewards />} />
            <Route path="/user/dashboard/my-address" element={<MyAddress />} />
          </Route>

          {/* Routes without Header */}
          <Route
            path="/VendorSignup"
            element={
              <LayoutWithHeader>
                <VendorSignup />
              </LayoutWithHeader>
            }
          />

          <Route
            path="/AdminVendorLogin"
            element={
              <LayoutWithHeader>
                <Login />
              </LayoutWithHeader>
            }
          />

          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<AllOrders />} />

          {/* Protected Routes without Header */}
          <Route
            path="/admin"
            element={<ProtectedRoutes Component={MainLayout} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/list-product" element={<AllProducts />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
            <Route path="/admin/category-list" element={<AllCategories />} />
            <Route path="/admin/all-orders" element={<OrderList />} />
            <Route path="/admin/add-offer" element={<AddOfferComponent />} />
            <Route path="/admin/invoice" element={<OrdersInvoice />} />
            <Route path="/admin/offer-list" element={<OfferList />} />
            <Route
              path="/admin/orderstatus/:status"
              element={<OrderStatus />}
            />
            {/* <Route path="/admin/revenue/yearly" element={<RevenueData />} /> */}
            <Route
              path="/admin/add-subcategory"
              element={<AddCategoryComponent />}
            />
          </Route>
          <Route
            path="/vendor"
            element={<ProtectedRoutes Component={VendorPanel} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const LayoutWithHeader = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default App;

//marketing system and CRM
// https://www.loom.com/share/b4efa6d5cb1c43eba152bce0f9c231dc
//https://www.youtube.com/watch?v=xGEyRgG5t-I
