import React, { useState, useCallback } from "react";
import authService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isRetailer, setIsRetailer] = useState(false); // Assuming initial state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const onChangeData = useCallback((e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  });

  const login = (formData) => {
    // Implement your login logic using formData
    console.log("Logging in with:", formData);

    console.log({ ...loginData });
    // setLoading(true)
    if (!loginData.email || !loginData.password) {
      toast.error("all details required");
      console.log("....");
    } else {
      if (formData.value == "superadmin") {
        authService
          .Adminlogin(loginData)
          .then((res) => {
            if (res) {
              console.log(res);
              if (res.data === "Credentials Invalid !!") toast.error(res.data);
              else {
                // dispatch(login(res.data));
                //   localStorage.setItem("isAdmin", res.data.superAdmin.isAdmin);
                localStorage.setItem("login", true);
                localStorage.setItem("userToken", res.data.token);
                localStorage.setItem("adminDetails", JSON.stringify(res.data));
                // console.log(res.data.token);
                navigate("/admin");
              }
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("something went wrong");
          });
      } else {
        authService
          .Vendorlogin(loginData)
          .then((res) => {
            if (res) {
              console.log(res);
              if (res.data === "Credentials Invalid !!") toast.error(res.data);
              else {
                // dispatch(login(res.data));
                //   localStorage.setItem("isVendor", true);
                localStorage.setItem("login", true);
                localStorage.setItem("userToken", res.data.token);
                localStorage.setItem("vendorDetails", JSON.stringify(res.data));
                // console.log(res.data.token);
                navigate("/vendor");
              }
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("something went wrong");
          });
      }
    }
  };

  return (
    <>
      {/* Login Form */}
      <div className={isRetailer ? "login" : ""}>
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                {/* <div
                  className="sign-logo"
                  id="logo"
                  style={{
                    backgroundColor: "#f7f7f7",
                    paddingTop: "25px",
                    paddingBottom: "0px",
                  }}
                >
                  <a><img src="assets/images/logo.png" alt="" /></a>
                </div> */}
                <div className="row justify-content-center ">
                  <div className="col-lg-4 ">
                    <div
                      className="card shadow-lg border-0 rounded-lg mt-5 "
                      style={{ backgroundColor: "white" }}
                    >
                      <div className="card-header card-sign-header">
                        <h3 className="text-center font-weight-light my-4">
                          Login
                        </h3>
                      </div>
                      <div className="flex justify-around mt-4">
                        {/* Vendor Checkbox */}
                        <div className="form-check  d-flex align-items-center">
                          <input
                            id="isVendor"
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={isRetailer}
                            onChange={() => setIsRetailer(true)}
                          />
                          <label
                            htmlFor="isVendor"
                            className="ml-3 text-2xl font-sans font-medium"
                          >
                            Vendor
                          </label>
                        </div>

                        {/* Superadmin Checkbox */}
                        <div className="form-check d-flex align-items-center ">
                          <input
                            id="isSuperadmin"
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={!isRetailer}
                            onChange={() => setIsRetailer(false)}
                          />
                          <label
                            htmlFor="isSuperadmin"
                            className="ml-3 text-2xl font-sans font-medium"
                          >
                            Admin
                          </label>
                        </div>
                      </div>
                      <div className="">
                        <form onSubmit={(e) => e.preventDefault()}>
                          {/* Email Input */}
                          <div className="form-group ">
                            <input
                              className="outline-none focus:outline-blue-400 focus:border-0 text-2xl focus:rounded-sm"
                              id="inputEmailAddress"
                              placeholder="Email"
                              type="email"
                              onChange={(e) => onChangeData(e)}
                              value={loginData.email}
                              name="email"
                            />
                          </div>

                          {/* Password Input */}
                          <div className="form-group">
                            <input
                              className="outline-none focus:outline-blue-400 focus:border-0 text-2xl focus:rounded-sm"
                              id="inputPassword"
                              type="password"
                              placeholder="password"
                              onChange={(e) => onChangeData(e)}
                              value={loginData.password}
                              name="password"
                            />
                          </div>

                          {/* Login Button */}
                          <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                            <button
                              type="submit"
                              className="bg-blue-500 p-2 text-white text-2xl w-full rounded-sm hover:bg-blue-400"
                              // Implement your form validation logic
                              // disabled={!isFormValid()}
                              onClick={() => {
                                login({
                                  email: loginData.email,
                                  password: loginData.password,
                                  value: isRetailer ? "vendor" : "superadmin",
                                });
                              }}
                            >
                              Login
                            </button>
                          </div>

                          {/* Signup Link */}
                          <div className="mt-2 text-center text-2xl">
                            <p>
                              Don't have an account?{" "}
                              <Link className="" to="/VendorSignup">
                                Sign Up Now
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
