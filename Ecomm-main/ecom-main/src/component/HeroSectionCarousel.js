import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../styles/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import styles
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";

const HeroSectionCarousel = () => {
  const [myDataa, setMyData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://swiftmart-416707.el.r.appspot.com/api/products/getallproducts"
      );
      const data = await res.json();
      console.log("carousel", data);
      setMyData(data); // Assuming the fetched data is an array of products
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  // Carousel configuration (optional)
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 480 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log("curent", myDataa);

  // Return the carousel
  return (
    <div className="carousel-container">
      <Carousel
        partialVisible={true}
        arrows={true}
        infinite={true}
        responsive={responsive}
      >
        {myDataa.map((curElem) => (
          <div className="image image-container" key={curElem.pphoto}>
            <figure>
              <img
                src={curElem.pphoto}
                alt={curElem.pname}
                onClick={() => navigate("/singleproduct/" + curElem._id)}
              />
              <figcaption>
                <p className="product-name"> {curElem.pname}</p>
                <p className="product-description"> {curElem.pdes}</p>
                <p>
                  <FormatPrice price={curElem.aprice}></FormatPrice>
                </p>
              </figcaption>
            </figure>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  .container {
    background-color: #ecf8fe;
  }
  .image-container {
    width: 300px;
    height: 200px; /* Set desired container size */
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Fills the container while maintaining aspect ratio */
  }
`;
export default HeroSectionCarousel;
