import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
const Header = () => {
  return <Nav />;
};
// const MainHeader = styled.header`
//   background-color: #232f3e; //#af7a6d;//663f46;//CF929A;//A69B7C;//89, 5, 31;//#E1AD78;//d4a373;//2e4756;//dbc2cf;//9fa2b2;//1c0c0f;//CF929A;//ecbdc2;//F79B72;//E3D9B0;//#004225; /* Deep dark gray for the background */
//   color: #f5f5f5; /* Light gray for text, providing high contrast */
//   padding: 0 5rem;
//   height: 12rem; /* Streamlined height for a sleek look */
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   position: relative;

//   img {
//     max-width: 12rem; /* Balanced logo size */
//     height: auto;
//   }

//   a {
//     color: inherit; /* Ensures NavLink inherits the header's text color */
//     text-decoration: none;

//     &:hover {
//       color: black; /* A pop of dark peach for hover effects */
//     }
//   }

//   /* Adjust Nav component styling for consistency */
//   ${Nav} {
//     a {
//       color: #f5f5f5; /* Light text for readability */
//       &:hover {
//         color: #ff6b6b; /* Hover color for interactive elements */
//       }
//     }
//   }
// `;
export default Header;
