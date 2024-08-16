import React, { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slideImages = [
  "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image2.png",
  "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image3.png",
  "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image4.png",
  "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image6.png",
  "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image8.png",
];
const Trusted = () => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <Wrapper className="brand-section ">
      <div className="container">
        <h3 className="tracking-wide leading-tight">
          Trusted By 1000+ Companies
        </h3>

        <div className="slider-container mt-5">
          <Slider {...settings}>
            {slideImages.map((slide) => (
              <div className="slide" key={slide}>
                <img src={`${slide}`} alt="trusted-brands" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 9rem 0; //padding between service and trusted
  // background-color:#ECF8FE;
  .container {
    // background-color:#ECF8FE;
  }

  .brand-section {
    padding: 0 0 0 0;
  }
  h3 {
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text};
    font-size: 4rem;
    font-weight: bold;
    background-color: white;
  }

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .brand-section-slider {
    margin-top: 3.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: white;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .brand-section-slider {
      margin-top: 3.2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      // background-color: red;
      text-align: center;
    }
  }
`;

export default Trusted;
