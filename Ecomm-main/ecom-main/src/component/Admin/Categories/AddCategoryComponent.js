import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import AdminService from "../../../Services/AdminService";
import { useDispatch, useSelector } from "react-redux";
import { getcategoryList } from "../../../features/categorySlice";

const AddCategoryComponent = () => {
  const service = AdminService();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categorieslist);
  // const [categories, setCategories] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [subdata, setSubdata] = useState({
    cid: "",
    name: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // useEffect(() => {

  //   dispatch(getcategoryList())

  // }, []);

  // const fetchingdata=async()=>{

  //   // const res = await service.getCategories()
  //   // setCategories(res)

  //   const admin = JSON.parse(localStorage.getItem('adminDetails'));
  //   setAdminId(admin.superAdmin._id);
  // }
  const addSubCategory = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    service.addSubCategory(subdata);
  };

  const newData = (e) => {
    setSubdata({ ...subdata, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container-fluid"
      style={{ marginTop: "55px", paddingTop: "20px" }}
    >
      <h2 className="mt-30 page-title">Sub Categories</h2>
      <Row style={{ paddingBottom: "170px" }}>
        <Col lg={6} md={6}>
          <div className="card card-static-2 mb-30">
            <div className="card-title-2">
              <h4>Add New Sub-Category</h4>
            </div>
            <div className="card-body-table">
              <div className="news-content-right pd-20">
                <form onSubmit={(e) => addSubCategory(e)}>
                  <div className="mb-3">
                    <label htmlFor="selectCategory" className="form-label">
                      Select Category*
                    </label>
                    <select
                      id="selectCategory"
                      className="form-control"
                      name="cid"
                      onChange={newData}
                    >
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <option key={category?._id} value={category?._id}>
                            {category?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subcategoryName" className="form-label">
                      Sub-category Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subcategoryName"
                      placeholder="Category Name"
                      name="name"
                      onChange={newData}
                    />
                  </div>
                  <button type="submit" className="save-btn hover-btn">
                    Add New Sub-Category
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {notification.show && (
        <div
          className={`notification ${
            notification.type === "success" ? "success" : "danger"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AddCategoryComponent;
