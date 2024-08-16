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
      `https://swiftmart-416707.el.r.appspot.com/api/products/addproduct?adminkey=${id}`,
      data
    );
  };

  const deleteProduct = (data) => {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/products/deleteproduct", data);
  };

  const pOffer = (data, id) => {
    return axios.post(
      `https://swiftmart-416707.el.r.appspot.com/api/products/addsuperproduct?adminkey=${id}`,
      data
    );
  };

  const update = (data) => {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/products/update", data);
  };

  const getSuper = () => {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/products/getsuper");
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
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/category/getcategories");
  };

  const addCategory = (data) => {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/category/addcategories", data);
  };

  const addSubCategory = (data) => {
    return axios.post(
      "https://swiftmart-416707.el.r.appspot.com/api/category/addsubcategory",
      data
    );
  };

  const deleteCategory = (data) => {
    console.log(data);
    return axios.post(
      "https://swiftmart-416707.el.r.appspot.com/api/category/deletecategory",
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
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/images/getbanners");
  };

  const getCustomers = () => {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/users/getUsers");
  };

  const getVendors = () => {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/vendors/getEmployee");
  };

  const addImage = (image, id) => {
    const formData = new FormData();
    formData.append("file", image);

    return axios.post(
      `https://swiftmart-416707.el.r.appspot.com/api/upload/addfiles?adminkey=${id}`,
      formData
    );
  };

  const addMultipleImage = (multipleImages, id) => {
    const formData = new FormData();

    for (let i = 0; i < multipleImages.length; i++) {
      formData.append("files", multipleImages[i]);
    }

    return axios.post(
      `https://swiftmart-416707.el.r.appspot.com/api/upload/addmultifiles?adminkey=${id}`,
      formData
    );
  };

  const getAllOrders = () => {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/orders/getallorders");
  };

  const getVendorsOrders = () => {
    return axios.get(
      `https://swiftmart-416707.el.r.appspot.com/api/orders/getvendorsorders?id=${currVen._id}`
    );
  };

  const addOffer = (data) => {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/images/addbanners", data);
  };

  const addOfferCategory = (data) => {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/images/addfoodbanners", data);
  };

  const deleteOffer = (data) => {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/images/deletebanner", data);
  };

  const updateStatus = (id, data) => {
    return axios.post(
      `https://swiftmart-416707.el.r.appspot.com/api/orders/updatestatus?id=${id}`,
      data
    );
  };

  const updateCategory = (data, id) => {
    return axios.post(
      `https://swiftmart-416707.el.r.appspot.com/api/category/updatecategory?id=${id}`,
      data
    );
  };

  const updateSubcategory = (data) => {
    return axios.post(
      "https://swiftmart-416707.el.r.appspot.com/api/category/updatesubcategory",
      data
    );
  };

  const getMonthlyRevenue = async () => {
    try {
      const response = await axios.get(
        "https://swiftmart-416707.el.r.appspot.com/api/orders/revenue/month"
      );
      return response.data;
    } catch (error) {}
  };

  const getYearlyRevenue = async () => {
    try {
      const response = await axios.get(
        "https://swiftmart-416707.el.r.appspot.com/api/orders/revenue/yearly"
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
