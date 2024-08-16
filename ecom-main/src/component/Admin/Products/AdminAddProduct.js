import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addProduct,
  getCategories,
  getSubcategories,
  getCategorty,
  addImage,
  addMultipleImage,
} from "../../../api";

import useGeoLocation from "../../../customHooks/useGeoLocation";

const AdminAddProduct = () => {
  const [photo, setPhoto] = useState(null);
  const [multiplePhotos, setMultiplePhotos] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [currUser, setCurrUser] = useState({});
  const location = useGeoLocation();
  const navigate = useNavigate();
  const [data, setdata] = useState({
    pname: "",
    pname: "",
    pdes: "",
    aprice: "",
    dprice: "",
    pphoto: "",
    pcat: "",
    pphoto: "",
    pictures: [],
    noofStock: null,
    geolocation: {
      latitude: null,
      longitude: null,
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const userStr = localStorage.getItem("adminDetails");
      const User = JSON.parse(userStr);

      setCurrUser(User.superAdmin);
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      console.log("ahfdlah", categoryId);
      const subcategoriesData = await getSubcategories(categoryId);
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };

  const onChangeCategory = async (event) => {
    const categoryId = event.target.value;
    console.log("before fetech..", categoryId);
    fetchSubcategories(categoryId);
    const selectedCategory = categories.find(
      (category) => category._id === categoryId
    );
    console.log(selectedCategory.name);
    // Update the data state with the selected category name
    setdata((prevData) => ({
      ...prevData,
      geolocation: {
        latitude: location.coordinates.lat,
        longitude: location.coordinates.long,
      },
      pcat: selectedCategory ? selectedCategory.name : "", // Set the category name or an empty string
    }));

    console.log("before...", data);
  };

  const onChangeSubcategory = (event) => {
    const subcategoryId = event.target.value;

    // Update the data state with the selected subcategory
  };

  const handleSubmit = async (e) => {
    console.log("clicked ", e.target.elements);
    e.preventDefault();

    setdata((prevData) => ({
      ...prevData,
      pname: e.target.elements.pname.value,
      aprice: e.target.elements.aprice.value,
      dprice: e.target.elements.dprice.value,
      noofStock: e.target.elements.noofStock.value,
      pdes: e.target.elements.pdes.value,
    }));

    try {
      await addProduct(data, currUser._id);
      toast.success("product added successfully");

      console.log(data);
      navigate("/admin/list-product");
    } catch (error) {
      toast.error("Product is not added please try again ");
      console.error("Error adding product:", error.message);
    }
  };

  // const backNavigation = () => {
  //   console.log("navigation");
  //   navigate("/vendor");
  // };

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file));

    try {
      const response = await addImage(file, currUser._id);

      setdata((prevData) => ({
        ...prevData,
        pphoto: response.longUrl,
      }));
    } catch (error) {
      console.error("Error uploading main image:", error.message);
    }
  };

  const onMultipleFileSelected = async (event) => {
    const files = event.target.files;
    const photos = Array.from(files).map((file) => URL.createObjectURL(file));
    setMultiplePhotos(photos);

    try {
      const response = await addMultipleImage(files, currUser._id);
      console.log(response);
      setdata((prevData) => ({
        ...prevData,
        pictures: response,
      }));
    } catch (error) {
      console.error("Error uploading multiple images:", error.message);
    }
  };

  const newdata = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container-fluid"
      style={{ marginTop: "55px", paddingTop: "20px" }}
    >
      {console.log(location)}

      <div className="d-flex justify-content-center">
        <div className="col-lg-6 col-md-6">
          <div className="card card-static-2 mb-30">
            <div className="card-title-2">
              <h4>Add New Product</h4>
            </div>
            <div className="card-body-table">
              <div className="news-content-right pd-20">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Name*</label>
                    <input
                      type="text"
                      // id="pname"
                      name="pname"
                      // value={data.pname}
                      className="form-control"
                      placeholder="Product Name"
                      onChange={newdata}
                    />
                  </div>

                  <div className="row">
                    <div className="form-group" style={{ width: "50%" }}>
                      <label className="form-label">Category*</label>
                      <select
                        className="form-control"
                        onChange={onChangeCategory}
                      >
                        <option value="" selected>
                          --Select Category--
                        </option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group" style={{ width: "50%" }}>
                      <label className="form-label">Sub Category*</label>
                      <select
                        className="form-control"
                        onChange={onChangeSubcategory}
                        name="psub"
                      >
                        <option value="" selected>
                          --Select Sub Category--
                        </option>
                        {subcategories.map((subcategory) => (
                          <option key={subcategory._id} value={subcategory._id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group" style={{ width: "50%" }}>
                      <label className="form-label">MRP*</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="aprice"
                        onChange={newdata}
                      />
                    </div>
                    <div className="form-group" style={{ width: "50%" }}>
                      <label className="form-label">Discount MRP*</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="dprice"
                        onChange={newdata}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Quantity*</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0"
                      name="noofStock"
                      onChange={newdata}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description*</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Description"
                      name="pdes"
                      onChange={newdata}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Main Image*</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/png"
                      onChange={onFileSelected}
                      name="pphoto"
                    />
                    {photo && (
                      <img
                        src={photo}
                        alt="Main"
                        style={{ width: "80px", height: "80px" }}
                      />
                    )}
                  </div>

                  {/* <div className="form-group">
                    <label className="form-label">More Images*</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/png"
                      multiple
                      onChange={onMultipleFileSelected}
                      name="pictures"
                    />
                    {multiplePhotos && (
                      <ul className="add-produc-imgs">
                        {multiplePhotos.map((photo, index) => (
                          <li key={index}>
                            <img
                              src={photo}
                              alt={`Extra ${index + 1}`}
                              style={{ width: "80px", height: "80px" }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div> */}

                  <Button className="save-btn hover-btn" type="submit">
                    Add New Product
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
