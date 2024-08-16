import React, { useEffect, useState } from "react";
import "./userdashboard.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserService from "../../../Services/UserService";
import logoimg from "./../image/img-5.jpg";
import { MdAddAPhoto } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToUserOrders } from "../../../features/orderSlice";
import { TextField } from "@mui/material";

const navItems = [
  { text: "overview", link: "/user/dashboard" },
  { text: "my orders", link: "/user/dashboard/my-orders" },
  { text: "my rewards", link: "/user/dashboard/my-rewards" },
  { text: "shopping wishlists", link: "/user/dashboard/my-wishlist" },
  { text: "my address", link: "/user/dashboard/my-address" },
];

const UserDashboard = ({ currRoute, logOut }) => {
  const [currUser, setCurrUser] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [userOrders, setUserOrders] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);

  const service = UserService();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userStr = localStorage.getItem("CurrentUser");
      const User = JSON.parse(userStr);

      setCurrUser(User);
      const orders = await service.getUserOrders(User._id);
      // const wish = await service.getwishlist(User._id)
      // setUserWishlist(wish)
      console.log("user id..-->", User);
      setUserOrders(orders);
      dispatch(addToUserOrders(orders));
    };

    fetchUserOrders();
  }, []);

  // const backNavigation = () => {
  //   navigate("/");
  // };

  return (
    <>
      <div className="wrapper" style={{ backgroundColor: "#f7f7f7" }}>
        <div className=" bg-blue-500" style={{ padding: "40px 0px" }}>
          {/* <span
            onClick={backNavigation}
            style={{ fontSize: "18px", cursor: "pointer" }}
          >
            <FaArrowLeft />
            Back
          </span> */}
          <div className="container">
            {/* <div className="row">
              <div className="col-lg-12">
                <div className="user-dt">
                  <div className="user-img">
                    <img src={logoimg} alt="profile" />
                    <div className="img-add">
                      <input
                        type="file"
                        id="file"
                        style={{ display: "contents" }}
                      />
                      <label htmlFor="file">
                        <div className="flex justify-center items-center">
                          <MdAddAPhoto />
                        </div>
                      </label>
                    </div>
                  </div>

                  <h4 className="text-3xl capitalize font-sans font-normal text-black">
                    {currUser?.name}
                  </h4>
                  <p className="font-sans  text-black">
                    {currUser?.phone}
                    <span className="iconify" data-icon="uil:edit"></span>
                  </p>
                  <div className="earn-points">
                    <img src="assets/images/Dollar.svg" alt="" />
                    Points : <span>20</span>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="container flex flex-col items-center gap-4">
              <div className="">
                <img
                  src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1710201600&semt=ais"
                  alt="profile picture"
                  className="h-64 w-64 rounded-full"
                />
              </div>
              <div className="grid  grid-cols-2 w-[60%] bg-white p-4 rounded-xl">
                <div className="capitalize">
                  <p>
                    name
                    <TextField
                      className="w-full "
                      placeholder="Search the docs…"
                      value={currUser?.name}
                    />
                  </p>
                  <p className="capitalize">
                    email
                    <TextField
                      placeholder="Search the docs…"
                      value={currUser?.email}
                      className="w-full "
                    />
                  </p>
                </div>
                <div>
                  <p className="capitalize">
                    contact
                    <TextField
                      placeholder="Search the docs…"
                      value={currUser?.phone}
                      className="w-full "
                    />
                  </p>
                  <p className="capitalize">
                    Address
                    <TextField
                      placeholder="Address"
                      value={currUser?.address}
                      className="w-full "
                    />
                  </p>
                </div>
                <div>
                  <button className="bg-blue-500 text-white capitalize px-2 py-1 rounded-lg">
                    update
                  </button>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="" style={{ padding: "20px 175px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <div className="left-side-tabs">
                  <div className="flex flex-col items-start ">
                    {navItems.map((item, index) => (
                      <NavLink
                        style={{ textDecoration: "none" }}
                        // className={({ isActive }) =>
                        //   `  duration-200 ${
                        //     isActive ? "bg-pink-100 text-white " : "bg-"
                        //   } text-center rounded-lg text-black w-full  font-bold p-2 font-sans text-2xl`
                        // }
                        className="w-full  text-2xl font-sans p-2 hover:bg-blue-100 text-black"
                        to={item.link}
                        key={item.text}
                      >
                        <span className="">
                          <span
                            className=" capitalize"
                            // data-icon="uil:apps"
                          >
                            {item.text}
                          </span>
                        </span>
                      </NavLink>
                    ))}

                    {/* <NavLink to="/user/dashboard/my-orders" >
                      <span className="user-item">
                        <span className="iconify" data-icon="uil:box"></span>My
                        Orders
                      </span>
                    </NavLink>
                    <NavLink to="/user/dashboard/my-rewards">
                      <span className="user-item">
                        <span className="iconify" data-icon="uil:gift"></span>My
                        Rewards
                      </span>
                    </NavLink>
                    <NavLink to="/user/dashboard/my-wishlist">
                      <span className="user-item">
                        <span className="iconify" data-icon="uil:heart"></span>
                        Shopping Wishlist
                      </span>
                    </NavLink>
                    <NavLink to="/user/dashboard/my-address">
                      <span className="user-item">
                        <span
                          className="iconify"
                          data-icon="uil:location-point"
                        ></span>
                        My Address
                      </span>
                    </NavLink> */}
                    <span
                      className=" w-full text-left p-2 text-2xl cursor-pointer hover:bg-blue-50"
                      onClick={logOut}
                    >
                      <span className="iconify" data-icon="uil:exit"></span>
                      Logout
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="dashboard-right">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
