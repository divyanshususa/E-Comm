import React, { useState, useCallback } from "react";
import "./Signin.css";

import authService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserData } from "../../features/userSlice";
import { AccountCircle } from "@mui/icons-material";
import {
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  XIcon,
} from "../../static/icons";

const Signin = () => {

  const navigate = useNavigate();
  const disptach = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChangeData = useCallback((e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  });

  const submit = (e) => {
    e.preventDefault();
    console.log({ ...loginData });
    // setLoading(true)
    if (!loginData.email || !loginData.password) {
      toast.error("all details required");
      console.log("....");
    } else {
      authService
        .login(loginData)
        .then((res) => {
          if (res) {
            console.log(res);
            if (res.data === "Credentials Invalid !!") toast.error(res.data);
            else {
              // dispatch(login(res.data));
              disptach(storeUserData(res.data.user));
              localStorage.setItem("login", true);
              localStorage.setItem("userToken", res.data.token);
              localStorage.setItem(
                "CurrentUser",
                JSON.stringify(res.data.user)
              );
              // console.log(res.data);
              // navigate("/");
    window.location.href = "/";

            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong");
        });
    }
  };
  return (
    <div className="signin-container ">
      <div className="text-center">
        <AccountCircle className="h-20 w-20" style={{ fontSize: "3rem" }} />
        <h2 className="font-semibold  text-3xl">Sign In</h2>
      </div>
      <form className="signin-form" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="email" className="text-2xl font-medium tracking-wide">
            Email
          </label>
          <input
            type="text"
            id="username"
            name="email"
            onChange={(e) => onChangeData(e)}
            value={loginData.email}
            required
            className="rounded-lg text-2xl outline-none focus:outline-blue-400 focus:border-0"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="password"
            className="text-2xl font-medium tracking-wide"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => onChangeData(e)}
            value={loginData.password}
            required
            className="rounded-lg text-2xl outline-none focus:outline-blue-400 focus:border-0"
          />
        </div>
        <button
          type="submit"
          className="text-white mt-2 p-3 rounded-lg text-center text-2xl bg-blue-500 hover:bg-blue-400"
        >
          Sign In
        </button>
        <Link
          className="mt-2 text-xl text-right hover:text-blue-800 hover:no-underline"
          style={{ textDecoration: "none" }}
        >
          forget Password?
        </Link>
      </form>

      {/* <div className="mt-4">
        <h3 className="text-center text-2xl capitalize font-normal text-gray-500">
          or
        </h3>
        <div className="flex justify-around mt-4">
          <GoogleIcon className="text-red-500" style={{ fontSize: "2rem" }} />
          <InstagramIcon className="0" style={{ fontSize: "2rem" }} />
          <XIcon style={{ fontSize: "2rem" }} />
          <FacebookIcon
            className="text-blue-600"
            style={{ fontSize: "2rem" }}
          />
        </div>
      </div> */}

      <ToastContainer />
    </div>
  );
};

export default Signin;
