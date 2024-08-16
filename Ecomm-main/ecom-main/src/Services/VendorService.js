import axios from "axios";

class WholesalerService {
  // Assuming you're using class properties, otherwise, adjust accordingly
  addProductForm = {
    pname: "",
    pcat: "",
    psub: "",
    aprice: null,
    dprice: null,
    pdes: "",
    quantity: null,
  };

  addExcelProductForm = {
    pname: "",
    pcat: "",
    psub: "",
    aprice: null,
    dprice: null,
    pdes: "",
    quantity: null,
  };

  addCategoryForm = {
    name: "",
    image: "",
  };

  addSubCategoryForm = {
    cid: "",
    name: "",
  };

  addOfferForm = {
    tittle: "",
    discount: "",
    addes: "",
    category: "",
  };

  getProducts() {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/products/getproducts");
  }

  addProduct(data, id) {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/products/addproduct", data, {
      params: { adminkey: id },
    });
  }

  getVendorproducts(id) {
    return axios.get(
      `https://swiftmart-416707.el.r.appspot.com/api/products/getvendorproducts?vid=${id}`
    );
  }

  getVendorsorders(id) {
    return axios.get(
      `https://swiftmart-416707.el.r.appspot.com/api/orders/getvendorsorders?vid=${id}`
    );
  }

  deleteProduct(data) {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/products/deleteproduct", data);
  }

  pOffer(data, id) {
    return axios.post(
      "https://swiftmart-416707.el.r.appspot.com/api/products/addsuperproduct",
      data,
      {
        params: { adminkey: id },
      }
    );
  }

  getRecentOrders(id) {
    return axios.get(
      `https://swiftmart-416707.el.r.appspot.com/api/orders/recent-orders?vid=${id}`
    );
  }

  getSuper() {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/products/getsuper");
  }

  getCategories() {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/category/getcategories");
  }

  addCategory(data) {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/category/addcategories", data);
  }

  addSubCategory(data) {
    return axios.post(
      "https://swiftmart-416707.el.r.appspot.com/api/category/addsubcategory",
      data
    );
  }

  deleteCategory(data) {
    return axios.post(
      "https://swiftmart-416707.el.r.appspot.com/api/category/deletecategory",
      data
    );
  }

  getAllOffers() {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/images/getbanners");
  }

  getCustomers() {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/users/getUsers");
  }

  addImage(image, id) {
    const formData = new FormData();
    formData.append("file", image);

    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/upload/addfiles", formData, {
      params: { adminkey: id },
    });
  }

  addMultipleImage(multipleImages, id) {
    const formData = new FormData();

    for (let i = 0; i < multipleImages.length; i++) {
      formData.append("files", multipleImages[i]);
    }

    return axios.post(
      "https://swiftmart-416707.el.r.appspot.com/api/upload/addmultifiles",
      formData,
      {
        params: { adminkey: id },
      }
    );
  }

  getAllOrders() {
    return axios.get("https://swiftmart-416707.el.r.appspot.com/api/orders/getallorders");
  }

  addOffer(data) {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/images/addbanners", data);
  }

  addOfferCategory(data) {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/images/addfoodbanners", data);
  }

  deleteOffer(data) {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/images/deletebanner", data);
  }

  updateStatus(id, data) {
    return axios.post("https://swiftmart-416707.el.r.appspot.com/api/orders/updatestatus", data, {
      params: { id: id },
    });
  }
}

const VendorService = new WholesalerService();
export default VendorService;
