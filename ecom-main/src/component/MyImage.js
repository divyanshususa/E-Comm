import React from "react";
import styled from "styled-components";
import { FavoriteIcon } from "../static/icons";
const MyImage = ({ imgs }) => {
  console.log("~ file:MyImage.js ~ line 4 ~ MyImage ~ imgs", imgs);
  return (
    <div className="flex flex-col gap-3 w-[400px]">
      <div className=" border-1 border-gray-200 bg-gray-100  w-[100%]">
        {/* <h2 className=" text-right p-2">
          <FavoriteIcon
            className="text-gray-200 cursor-pointer hover:text-gray-300"
            style={{ fontSize: "2rem" }}
          />
        </h2> */}
        <img src={imgs} alt={imgs} className="h-[440px] object-cover w-full" />
      </div>
     
    </div>
  );
};
const Wrapper = styled.section`
  // display: grid;
  // grid-template-columns: 0.4fr 1fr;
  // gap: 1rem;

  // .grid {
  //   flex-direction: row;
  //   justify-items: center;
  //   align-items: center;
  //   width: 100%;
  //   gap: 1rem;
  //   /* order: 2; */

  //   img {
  //     max-width: 100%;
  //     max-height: 100%;
  //     background-size: cover;
  //     object-fit: contain;
  //     cursor: pointer;
  //     box-shadow: ${({ theme }) => theme.colors.shadow};
  //   }
  // }

  // .main-screen {
  //   display: grid;
  //   place-items: center;
  //   order: 1;

  //   img {
  //     max-width: 60rem;
  //     max-height: 60rem;
  //     box-shadow: ${({ theme }) => theme.colors.shadow};
  //   }
  // }
  // .grid-four-column {
  //   grid-template-columns: 1fr;
  //   grid-template-rows: repeat(4, 1fr);
  // }

  // @media (max-width: ${({ theme }) => theme.media.mobile}) {
  //   display: flex;
  //   flex-direction: column;
  //   order: 1;

  //   .grid-four-column {
  //     grid-template-rows: 1fr;
  //     grid-template-columns: repeat(4, 1fr);
  //   }
  // }
`;
export default MyImage;
