import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PageNavigation = ({ title }) => {
  return (
    <div className="text-2xl  text-gray-400 capitalize my-6 flex items-start justify-start container ">
      <NavLink to="/" className="text-gray-400 mr-2 hover:no-underline">
        home
      </NavLink>

      {">"}
      <span className="ml-2 text-black">{title}</span>
    </div>
  );
};

const Wrapper = styled.section`
  // height: 10rem;
  // background-color: ${({ theme }) => theme.colors.bg};
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;
  // font-size: 3.2rem;
  // padding-left: 1.2rem;

  // a {
  //   font-size: 3.2rem;
  // }
`;

export default PageNavigation;
