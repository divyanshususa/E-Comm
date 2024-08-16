import React, { useEffect, useState } from "react";
import "./OfferAds.css";
import UserService from "../../Services/UserService";
import { Link } from "react-router-dom";

const OfferAds = () => {
  const [offerlist, setOfferList] = useState([]);
  const service = UserService();

  useEffect(() => {
    const fetchData = async () => {
      const list = await service.getBanners();
      setOfferList(list);
    };
    fetchData();
  }, []);

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const groupedOffers = chunkArray(offerlist, 3);

  return (
    <div>
      <div style={{ padding: "2rem" }}>
        <h2 className=" font-sans text-3xl font-semibold text-black">
          Latest Offers
        </h2>
      </div>

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {groupedOffers.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {groupedOffers.map((offerGroup, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <section className="articles ">
                {offerGroup.map((offer, innerIndex) => (
                  <article key={innerIndex}>
                    <div className="article-wrapper border-1 rounded-xl h-[35rem]">
                      <figure>
                        <img
                          src={offer.adlink}
                          alt=""
                          // style={{ width: "100%" }}
                          className="rounded-xl object-cover w-full"
                        />
                      </figure>
                      <div className="article-body">
                        <h2 className="font-sans capitalize">
                          {" "}
                          {offer.tittle || "offer Title"}
                        </h2>
                        <p className="text-2xl tracking-wide">
                          {offer.addes || "offer description"}
                        </p>
                        <Link href="" className="read-more capitalize text-xl">
                          Read more{" "}
                          <span className="sr-only">
                            about this is some title
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
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
          data-bs-target="#carouselExampleIndicators"
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
  );
};

export default OfferAds;
