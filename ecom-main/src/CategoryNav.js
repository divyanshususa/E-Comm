import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductContext } from "./context/Productcontext";

const CategoryNav = ({ categories }) => {
  const { getSearched } = useProductContext();

  const SearchProduct = (subCat) => {
    const {name} = subCat;
    console.log(subCat);
    const newCategoryName=name.replace(/ /g, "-");
   getSearched(name);
    // console.log(result);
    console.log(newCategoryName);
    navigate(`/product/${newCategoryName}`);
  };

  const navigate = useNavigate();
  return (
    <div className="">
      <div className="py-3 py-md-5 bg-light">
        <div className="p-5">
          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-4 text-3xl font-semibold  text-black font-sans">
                Top Categories
              </h2>
            </div>
            <div className="col-12">
              <div
                id="categoryCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {categories &&
                    categories.map((cat, index) => {
                      // Display cards in pairs of three
                      if (index % 3 === 0) {
                        return (
                          <div
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                            key={cat._id}
                          >
                            <div className="row">
                              {[0, 1, 2].map((subIndex) => {
                                const subCatIndex = index + subIndex;
                                const subCat = categories[subCatIndex];
                                return (
                                  subCat && (
                                    <div
                                      className="col-md-4"
                                      key={subCat._id}
                                      onClick={() => {
                                        SearchProduct(subCat);
                                      }}
                                    >
                                      <Link
                                        to=""
                                        style={{ textDecoration: "none" }}
                                      >
                                        <div className="category-card rounded-lg">
                                          <div className="category-card-img">
                                            <img
                                              src={subCat.image}
                                              className="w-full h-96 object-cover hover:scale-105 hover:duration-300"
                                              alt={subCat.name}
                                            />
                                          </div>
                                          <div className="category-card-body">
                                            <h5 className="font-sans capitalize no-underline">
                                              {subCat.name}
                                            </h5>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  )
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#categoryCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#categoryCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
