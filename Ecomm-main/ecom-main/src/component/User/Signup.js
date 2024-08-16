// Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import authService from "./../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signupData = {
        name: `${firstName} ${lastName}`,
        phone: mobileNumber,
        email,
        password,
        // You may want to add 'expdate' here if needed
      };

      // Call the userSignup function to send the signup request
      const result = await authService.userSignup(signupData);
      toast.success("signup successfully.");
      // Handle the result as needed
      console.log("User signup result:", result);

      // You can navigate the user to a different page after successful signup
      navigate("/signin"); // Adjust this route as necessary.
    } catch (error) {
      toast.error("Error in sign up ");
      // Handle error, log, or display an error message to the user
      console.error("User signup failed:", error.message);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="font-semibold text-center text-3xl">Sign Up</h2>
        <div className="form-group">
          <label
            htmlFor="firstName"
            className="text-2xl font-medium tracking-wide"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="text-xl outline-none focus:rounded-sm focus:border-0 focus:outline-blue-300"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="lastName"
            className="text-2xl font-medium tracking-wide"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="text-xl outline-none focus:rounded-sm focus:border-0 focus:outline-blue-300"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-2xl font-medium tracking-wide">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-xl outline-none focus:rounded-sm focus:border-0 focus:outline-blue-300"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-xl outline-none focus:rounded-sm focus:border-0 focus:outline-blue-300"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="mobileNumber"
            className="text-2xl font-medium tracking-wide"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            className="text-xl outline-none focus:rounded-sm focus:border-0 focus:outline-blue-300"
          />
        </div>
        <button
          type="submit"
          className="text-white mt-2 p-3 rounded-lg text-center text-2xl bg-blue-500 hover:bg-blue-400 w-full"
        >
          Sign Up
        </button>
        <div className="signin-link text-2xl">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="hover:text-blue-700" style={{ textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
