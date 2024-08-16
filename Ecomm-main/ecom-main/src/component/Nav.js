import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import "./Nav.css";
import UserService from "../Services/UserService";
import { useProductContext } from "../context/Productcontext";
import useGeoLocation from "../customHooks/useGeoLocation";

import { useDispatch, useSelector } from "react-redux";
import {
  AccountCircleIcon,
  LocationOnIcon,
  SearchIcon,
  ShoppingCartIcon,
  SupportAgentIcon,
  FavoriteIcon,
  StarRateIcon,
  StoreIcon,
  KeyboardArrowDownIcon,
  LogoutIcon,
} from "../static/icons";
import { currencyType } from "../features/currencySlice";

const service = UserService();
const Nav = () => {
  const [menuIcon, setMenuIcon] = useState();
  const [searchquery, setsearchquery] = useState("");
  const [searchedItem, setSearchItem] = useState();
  const [currUser, setCurrUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const { total_item } = useCartContext();
  const { getSearched } = useProductContext();

  const { carts } = useSelector((state) => state.allCart);
  const { user } = useSelector((state) => state.CurrentUser);
  const { wishlist } = useSelector((state) => state.allWishlist);
  const dispatch = useDispatch();


  const location = useGeoLocation();
  console.log(location)

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    const Log = JSON.parse(localStorage.getItem("login"));
    const usr = JSON.parse(localStorage.getItem("CurrentUser"));
    setIsLogin(Log);
    setCurrUser(usr);
    console.log("inside useEffect:", location)
    if (!(location.ispProvider === 'AS55836 Reliance Jio Infocomm Limited'))
      dispatch(currencyType("INR"));
    else dispatch(currencyType("USD"));
  }, [isLogin, location]);

  useEffect(() => {
    getSearched(searchquery);
  }, [searchquery]);

  console.log(isLogin);


  return (
    <div className="">
      <div className=" bg-blue-500 ">
        <div className=" pt-4 flex shadow-md justify-around items-center">
          <div className="">
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              className="text-2xl sm:text-4xl font-semibold  text-white "
            >
              SwiftCart
            </Link>
            <div className="text-white   items-center hidden sm:flex">
              <LocationOnIcon style={{ fontSize: "2rem" }} />
              <span className="text-2xl text-white">
                {" "}
                location
                {/* {location.loaded
                ? JSON.stringify(location.coordinates)
              : "no location"} */}
              </span>
            </div>
          </div>
          <form className=" bg-white  sm:p-2 text-2xl sm:text-3xl w-[40%]  md:w-[50%]  rounded-md flex">
            <button
              className="text-gray-500 "
              onClick={() => {
                navigate(`/product/${searchquery}`);
              }}
            >
              <SearchIcon style={{ fontSize: "2.5rem" }} />
            </button>
            <input
              type="text"
              placeholder="Search for products, Brands..."
              className="outline-none w-[40%] sm:w-[50%] "
              onChange={(e) => {
                setsearchquery(e.target.value);
              }}
              value={searchquery}
            />
          </form>
          <div className="">
            <ul className="">
              {!isLogin ? (
                <div className="flex justify-between gap-3 sm:gap-6 text-3xl">
                  {/* <Link className="text-white " to="/signup">
                    SignUp
                  </Link> */}

                  <Link
                    // className="text-white flex items-center "
                    className="group text-white flex items-center  relative dropdown cursor-pointer"
                    style={{ textDecoration: "none" }}
                    to="/signin"
                  >
                    <span className="group  relative dropdown tracking-wide ml-2 hidden sm:block">
                      Login
                    </span>
                    <div className="group-hover:block border-none border-0 outline-none dropdown-menu absolute hidden h-96">
                      <ul className=" w-80 bg-white flex flex-col gap-8 ">
                        <li className="px-2">
                          <Link
                            style={{ textDecoration: "none" }}
                            className="flex  items-center cursor-pointer text-2xl capitalize text-black"
                          >
                            <AccountCircleIcon style={{ fontSize: "2rem" }} />
                            <span className="ml-2  ">profile</span>
                          </Link>
                        </li>
                        <li className="px-2">
                          <Link
                            style={{ textDecoration: "none" }}
                            className="flex  items-center cursor-pointer text-2xl capitalize"
                          >
                            <StoreIcon style={{ fontSize: "2rem" }} />
                            <span className="ml-2  text-black">orders</span>
                          </Link>
                        </li>
                        <li className="px-2">
                          <Link
                            style={{ textDecoration: "none" }}
                            className="flex  items-center cursor-pointer text-2xl capitalize text-red-400"
                          >
                            <FavoriteIcon style={{ fontSize: "2rem" }} />
                            <span className="ml-2  text-black">wishlist</span>
                          </Link>
                        </li>
                        <li className="px-2">
                          <Link
                            style={{ textDecoration: "none" }}
                            className="flex  items-center cursor-pointer text-2xl capitalize text-yellow-300"
                          >
                            <StarRateIcon style={{ fontSize: "2rem" }} />
                            <span className="ml-2  text-black">rewards</span>
                          </Link>
                        </li>
                        <li className="px-2">
                          <Link
                            style={{ textDecoration: "none" }}
                            className="flex  items-center cursor-pointer text-2xl capitalize"
                          >
                            <ShoppingCartIcon style={{ fontSize: "2rem" }} />
                            <span className="ml-2  text-black">Cart</span>
                          </Link>
                        </li>
                        <li className="px-2 capitalize">
                          <div className=" cursor-pointer text-2xl flex justify-between ">
                            <span>New customer?</span>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={"/signup"}
                            >
                              sign up
                            </Link>
                          </div>
                        </li>
                        <li className="px-2 capitalize">
                          <div className=" cursor-pointer text-2xl flex justify-between">
                            <span>Become a vender</span>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={"/VendorSignup"}
                            >
                              sign up
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Link>

                  <Link
                    className="text-white flex "
                    style={{ textDecoration: "none" }}
                    to=""
                  >
                    <SupportAgentIcon style={{ fontSize: "2rem" }} />
                    <span className="ml-2  hidden sm:block"> Support</span>
                  </Link>
                </div>
              ) : (
                <div className="flex text-2xl ">
                  <li className="nav-item text-white">
                    {/* <a className="nav-link" href="/cart">
                                    <i className="fa fa-shopping-cart"></i> Cart ({carts.length})
                                </a> */}
                    <NavLink to="/cart" className="nav-link">
                      <i className="fa fa-shopping-cart"></i> Cart (
                      {carts.length})
                    </NavLink>
                  </li>
                  <li className="nav-item text-white">
                    <NavLink
                      to="/user/dashboard/my-wishlist"
                      className="nav-link"
                    >
                      <i className="fa fa-heart"></i> Wishlist (
                      {wishlist.length})
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown text-white flex justify-center">
                    <a
                      className="nav-link dropdown-toggle"
                      href=""
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-user "></i>
                      <span className="ml-2">Hello!, {currUser?.name}</span>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item text-2xl"
                          to="/user/dashboard"
                        >
                          <i className="fa fa-user"></i> Profile
                        </Link>
                      </li>

                      {/* <li><a className="dropdown-item" href="#"><i className="fa fa-list"></i> My Orders</a></li> */}
                      {/* <li><a className="dropdown-item" href="#"><i className="fa fa-heart"></i> My Wishlist</a></li> */}
                      {/* <li><a className="dropdown-item" href="#"><i className="fa fa-shopping-cart"></i> My Cart</a></li> */}
                      <li>
                        <Link
                          onClick={logout}
                          className="dropdown-item text-2xl"
                        >
                          <LogoutIcon /> Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* home all-category new-arrival featuredPRoduct fashion electronics*/}
      <nav className="mt-2 bg-gray-100 w-[621px] sm:w-full sm:overflow-hidden  text-black flex  items-center justify-around text-2xl font-medium capitalize p-2 ">
        <Link className="text-black">
          home & furniture
          <KeyboardArrowDownIcon style={{ fontSize: "2rem" }} />
        </Link>
        <Link className="text-black">
          new arrival <KeyboardArrowDownIcon style={{ fontSize: "2rem" }} />
        </Link>
        <Link className="text-black">
          featured Product{" "}
          <KeyboardArrowDownIcon style={{ fontSize: "2rem" }} />
        </Link>
        <Link className="text-black">
          fashion <KeyboardArrowDownIcon style={{ fontSize: "2rem" }} />
        </Link>
        <Link className="text-black">
          electronics <KeyboardArrowDownIcon style={{ fontSize: "2rem" }} />
        </Link>
        <Link className="text-black">
          Beauty <KeyboardArrowDownIcon style={{ fontSize: "2rem" }} />
        </Link>
        <Link className="text-black">
          Mobile <KeyboardArrowDownIcon style={{ fontSize: "2rem" }} />
        </Link>
      </nav>
    </div>

    // <Nav>
    //   <div classNameName={menuIcon ? "navbar active" : "navbar"}>
    //     <ul classNameName="navbar-lists">
    //       <li>
    //         <NavLink
    //           to="/"
    //           classNameName="navbar-link "
    //           onClick={() => setMenuIcon(false)}>
    //           Home
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/about"
    //           classNameName="navbar-link "
    //           onClick={() => setMenuIcon(false)}>
    //           About
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/products"
    //           classNameName="navbar-link "
    //           onClick={() => setMenuIcon(false)}>
    //           Products
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/contact"
    //           classNameName="navbar-link "
    //           onClick={() => setMenuIcon(false)}>
    //           Contact
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/signup"
    //           classNameName="navbar-link "
    //           onClick={() => setMenuIcon(false)}>
    //           Signup
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/signin"
    //           classNameName="navbar-link "
    //           onClick={() => setMenuIcon(false)}>
    //           Signin
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/cart" classNameName="navbar-link cart-trolley--link">
    //           <FiShoppingCart classNameName="cart-trolley" />
    //           <span classNameName="cart-total--item"> {total_item} </span>
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/user/dashboard">

    //         <CgProfile style={{fontSize:"30px", color:'black'}} />
    //           </NavLink>
    //       </li>
    //     </ul>

    //     {/* two button for open and close of menu */}
    //     <div classNameName="mobile-navbar-btn">
    //       <CgMenu
    //         name="menu-outline"
    //         classNameName="mobile-nav-icon"
    //         onClick={() => setMenuIcon(true)}
    //       />
    //       <CgClose
    //         name="close-outline"
    //         classNameName="mobile-nav-icon close-outline"
    //         onClick={() => setMenuIcon(false)}
    //       />
    //     </div>
    //   </div>
    // </Nav>
  );
};

export default Nav;
