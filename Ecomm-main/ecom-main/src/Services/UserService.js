import axios from "axios";
import { useEffect, useState } from "react";

const UserService = () => {
  // const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("CurrentUser")));

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://swiftmart-416707.el.r.appspot.com/api/users/getUsers"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  };

  const getBanners = async () => {
    try {
      const response = await axios.get(
        "https://swiftmart-416707.el.r.appspot.com/api/images/getbanners"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  };

  const getOrder = async (url) => {
    try {
      const response = await axios.get(
        `https://swiftmart-416707.el.r.appspot.com/api/orders/details?id=${url}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user order:", error);
      throw error;
    }
  };

  const getsearch = async (val) => {
    try {
      const response = await axios.get(
        `https://swiftmart-416707.el.r.appspot.com/api/products/search?search=${val}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user order:", error);
      throw error;
    }
  };

  const getUserOrders = async (id) => {
    try {
      const response = await axios.get(
        `  https://swiftmart-416707.el.r.appspot.com/api/orders/getUserOrders?userId=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user order:", error);
      throw error;
    }
  };

  const updatePhoneNumber = async (data) => {
    try {
      await axios.post("https://swiftmart-416707.el.r.appspot.com/api/users/updatephone", data);
    } catch (error) {
      console.error("Error updating phone number:", error);
      throw error;
    }
  };

  const getUserProfile = async (id) => {
    try {
      const response = await axios.get(
        `https://swiftmart-416707.el.r.appspot.com/api/users/getprofile?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        "https://swiftmart-416707.el.r.appspot.com/api/orders/getallorders"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  };

  const getwishlist = async (id) => {
    try {
      const response = await axios.get(
        `https://swiftmart-416707.el.r.appspot.com/api/wishlist/getwishlist?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  };

  const addAddress = async (data) => {
    try {
      await axios.post("https://swiftmart-416707.el.r.appspot.com/api/users/addaddress", data);
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await axios.post("https://swiftmart-416707.el.r.appspot.com/api/users/removecart", "any");
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://swiftmart-416707.el.r.appspot.com/api/category/getcategories"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getDeliveryList = async () => {
    try {
      const response = await axios.get(
        "https://swiftmart-416707.el.r.appspot.com/api/delivery/getlist"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching delivery list:", error);
      throw error;
    }
  };
  const addtoUserCart = async (data) => {
    try {
      await axios.post("https://swiftmart-416707.el.r.appspot.com/api/cart/addtocart", data);
      return "product is successfully added to cart";
    } catch (error) {
      console.error("Error :", error);
      throw error;
    }
  };

  return {
    // currUser,
    getAllUsers,
    getUserOrders,
    getOrder,
    updatePhoneNumber,
    getUserProfile,
    getAllOrders,
    addAddress,
    clearCart,
    getDeliveryList,
    getwishlist,
    getBanners,
    getAllCategories,
    getsearch,
    addtoUserCart,
  };
};

export default UserService;
