import { useState } from "react";
import { FormControl, FormGroup, Validators } from "react-bootstrap";
import axios from "axios";
import { BsChevronCompactLeft } from "react-icons/bs";

const AdminService = () => {
  const [currVen, setCurrVen] = useState(
    JSON.parse(localStorage.getItem("adminDetails"))
  );

  const addProductForm = {
    pname: "",
    pcat: "",
    psub: "",
    moi: "",
    dust: "",
    gcv: "",
    aprice: null,
    dprice: null,
    pdes: "",
    quantity: null,
  };

  const addExcelProductForm = {
    pname: "",
    pcat: "",
    psub: "",
    aprice: null,
    dprice: null,
    pdes: "",
    quantity: null,
  };

  const addProduct = (data, id) => {
    return axios.post(
      `http://localhost:5000/api/products/addproduct?adminkey=${id}`,
      data
    );
  };

  const deleteProduct = (data) => {
    return axios.post("http://localhost:5000/api/products/deleteproduct", data);
  };

  const pOffer = (data, id) => {
    return axios.post(
      `http://localhost:5000/api/products/addsuperproduct?adminkey=${id}`,
      data
    );
  };

  const update = (data) => {
    return axios.post("http://localhost:5000/api/products/update", data);
  };

  const getSuper = () => {
    return axios.get("http://localhost:5000/api/products/getsuper");
  };

  const addCategoryForm = {
    name: "",
    image: "",
  };

  const addSubCategoryForm = {
    cid: "",
    name: "",
  };

  const getCategories = () => {
    return axios.get("http://localhost:5000/api/category/getcategories");
  };

  const addCategory = (data) => {
    return axios.post("http://localhost:5000/api/category/addcategories", data);
  };

  const addSubCategory = (data) => {
    return axios.post(
      "http://localhost:5000/api/category/addsubcategory",
      data
    );
  };

  const deleteCategory = (data) => {
    console.log(data);
    return axios.post(
      "http://localhost:5000/api/category/deletecategory",
      data
    );
  };

  const addOfferForm = {
    tittle: "",
    discount: "",
    addes: "",
    category: "",
  };

  const getAllOffers = () => {
    return axios.get("http://localhost:5000/api/images/getbanners");
  };

  const getCustomers = () => {
    return axios.get("http://localhost:5000/api/users/getUsers");
  };

  const getVendors = () => {
    return axios.get("http://localhost:5000/api/vendors/getEmployee");
  };

  const addImage = (image, id) => {
    const formData = new FormData();
    formData.append("file", image);

    return axios.post(
      `http://localhost:5000/api/upload/addfiles?adminkey=${id}`,
      formData
    );
  };

  const addMultipleImage = (multipleImages, id) => {
    const formData = new FormData();

    for (let i = 0; i < multipleImages.length; i++) {
      formData.append("files", multipleImages[i]);
    }

    return axios.post(
      `http://localhost:5000/api/upload/addmultifiles?adminkey=${id}`,
      formData
    );
  };

  const getAllOrders = () => {
    return axios.get("http://localhost:5000/api/orders/getallorders");
  };

  const getVendorsOrders = () => {
    return axios.get(
      `http://localhost:5000/api/orders/getvendorsorders?id=${currVen._id}`
    );
  };

  const addOffer = (data) => {
    return axios.post("http://localhost:5000/api/images/addbanners", data);
  };

  const addOfferCategory = (data) => {
    return axios.post("http://localhost:5000/api/images/addfoodbanners", data);
  };

  const deleteOffer = (data) => {
    return axios.post("http://localhost:5000/api/images/deletebanner", data);
  };

  const updateStatus = (id, data) => {
    return axios.post(
      `http://localhost:5000/api/orders/updatestatus?id=${id}`,
      data
    );
  };

  const updateCategory = (data, id) => {
    return axios.post(
      `http://localhost:5000/api/category/updatecategory?id=${id}`,
      data
    );
  };

  const updateSubcategory = (data) => {
    return axios.post(
      "http://localhost:5000/api/category/updatesubcategory",
      data
    );
  };

  const getMonthlyRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/revenue/month"
      );
      return response.data;
    } catch (error) {}
  };

  const getYearlyRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/revenue/yearly"
      );
      return response.data;
    } catch (error) {}
  };
  return {
    currVen,
    addProductForm,
    addExcelProductForm,
    getYearlyRevenue,
    getMonthlyRevenue,
    addProduct,
    deleteProduct,
    pOffer,
    update,
    getSuper,
    addCategoryForm,
    addSubCategoryForm,
    getCategories,
    addCategory,
    addSubCategory,
    deleteCategory,
    addOfferForm,
    getAllOffers,
    getCustomers,
    getVendors,
    addImage,
    addMultipleImage,
    getAllOrders,
    getVendorsOrders,
    addOffer,
    addOfferCategory,
    deleteOffer,
    updateStatus,
    updateCategory,
    updateSubcategory,
  };
};

export default AdminService;
