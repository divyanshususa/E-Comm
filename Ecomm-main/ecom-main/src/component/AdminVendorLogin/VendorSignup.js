import React, { useState } from "react";
import "./Signup.css";
import authService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const VendorSignup = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    regno: "",
    panno: "",
    adharno: "",
    state: "",
  });

  const navigate = useNavigate();

  const [signUpError, setSignUpError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("Signup succesfully done ");

  const signUp = (formData) => {
    // Implement your sign-up logic using formData
    console.log("Signing up with:", formData);
    // setLoading(true)
    if (
      !formData.name ||
      !formData.email ||
      !formData.adharno ||
      !formData.panno ||
      !formData.password ||
      !formData.phone ||
      !formData.regno ||
      !formData.state
    ) {
      toast.error("all details required");
    } else {
      authService
        .VendorSignup(formData)
        .then((res) => {
          if (res) {
            console.log(res);
            if (res.data === "Credentials Invalid !!") toast.error(res.data);
            else {
              setSuccess(true);

              // dispatch(login(res.data));
              // localStorage.setItem("login", true);
              setTimeout(() => {
                navigate("/AdminVendorLogin");
              }, 2000);
            }
          }
        })
        .catch((err) => {
          // console.log(err);
          setSignUpError(true);
          setErrorText("Unable to sign up");
          toast.error("something went wrong");
        });
    }

    // For example, you can display an error message

    // setErrorText('sign up successfully done ..');
  };

  const onChangeData = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  return (
    <div className="m-4">
      <div className="sign-inup">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="sign-form">
                <div className="sign-inner">
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {successText}!
                    </div>
                    // <div className="success d-flex">
                    //   <span style={{ marginRight: '3px' }}></span>
                    // </div>
                  )}
                  {signUpError && (
                    <div className="alert alert-danger">{errorText}!</div>
                  )}

                  <div className="form-dt   border-1 ">
                    <div className="form-inpts checout-address-step p-3">
                      <form onSubmit={(e) => e.preventDefault()} className="px-4 flex  flex-col gap-2 ">
                        <h6 className="  my-3 text-3xl font-sans capitalize text-center">
                          vendor sign up
                        </h6>
                        <div className="form-group pos_rel ">
                          <input
                            name="name"
                            placeholder="Full name"
                            type="text"
                            id="username"
                            onChange={(e) => onChangeData(e)}
                            value={signUpData.name}
                            className="rounded-lg outline-none focus:outline-blue-400 focus:rounded-none focus:border-0  text-2xl font-sans font-normal capitalize"
                            required
                          />
                        </div>
                        <div className="form-group pos_rel">
                          <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            className="rounded-lg outline-none focus:outline-blue-400 focus:rounded-none focus:border-0  text-2xl font-sans font-normal capitalize"
                            required
                            onChange={onChangeData}
                            value={signUpData.email}
                          />
                        </div>
                        <div className="form-group pos_rel">
                          <input
                            name="phone"
                            type="text"
                            placeholder="Phone Number"
                            className="rounded-lg outline-none focus:outline-blue-400 focus:rounded-none focus:border-0  text-2xl font-sans font-normal capitalize"
                            required
                            onChange={onChangeData}
                            value={signUpData.phone}
                          />
                        </div>
                        <div className="form-group pos_rel">
                          <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="rounded-lg outline-none focus:outline-blue-400 focus:rounded-none focus:border-0  text-2xl font-sans font-normal capitalize"
                            required
                            onChange={onChangeData}
                            value={signUpData.password}
                          />
                        </div>
                        <div className="form-group pos_rel">
                          <input
                            name="regno"
                            type="text"
                            placeholder="Registration Number"
                            className="rounded-lg outline-none focus:outline-blue-400 focus:rounded-none focus:border-0  text-2xl font-sans font-normal capitalize"
                            required
                            onChange={onChangeData}
                            value={signUpData.regno}
                          />
                        </div>
                        <div className="form-group pos_rel">
                          <input
                            name="panno"
                            type="text"
                            placeholder="PAN Number"
                            className="rounded-lg outline-none focus:outline-blue-400 focus:rounded-none focus:border-0  text-2xl font-sans font-normal capitalize"
                            required
                            onChange={onChangeData}
                            value={signUpData.panno}
                          />
                        </div>
                        <div className="form-group pos_rel">
                          <input
                            name="adharno"
                            type="text"
                            placeholder="Aadhar Card Number"
                            className="rounded-lg outline-none focus:outline-blue-400 focus:rounded-none focus:border-0  text-2xl font-sans font-normal capitalize"
                            required
                            onChange={onChangeData}
                            value={signUpData.adharno}
                          />
                        </div>
                        <div className="form-group pos_rel">
                          <input
                            name="state"
                            type="text"
                            placeholder="State"
                            className="rounded-lg outline-none focus:outline-blue-400 focus:rounded-none focus:border-0  text-2xl font-sans font-normal capitalize"
                            required
                            onChange={onChangeData}
                            value={signUpData.state}
                          />
                        </div>
                        <button
                          className="text-white mt-2 p-3 rounded-lg text-center text-2xl bg-blue-500 hover:bg-blue-400 w-full"
                          type="submit"
                          onClick={() => signUp(signUpData)}
                        >
                          Sign Up Now
                        </button>
                      </form>
                    </div>
                    <div className="p-1">
                      <p className="text-center text-2xl">
                        have an account? -{" "}
                        <Link className="cred" to="/AdminVendorLogin">
                          Sign In Now
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
