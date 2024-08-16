import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";

import UserService from "./../Services/UserService";

const HeroSection = () => {
  const [offerlist, setOfferList] = useState([]);
  const service = UserService();

  useEffect(() => {
    const fetchData = async () => {
      const list = await service.getBanners();
      // console.log(list);
      setOfferList(list);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {offerlist &&
              offerlist.map((offer, id) => {
                return (
                  <div
                    className={
                      id === 1 ? "carousel-item active" : "carousel-item"
                    }
                    data-bs-interval="3000"
                    key={id}
                  >
                    <img
                      src={offer.adlink}
                      className="w-[100%]  object-cover h-[400px]"
                      alt="..."
                      style={
                        {
                          // // width: "800px",
                          // // height: "400px",
                          // objectFit: "contain",
                        }
                      }
                    />
                  </div>
                );
              })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
