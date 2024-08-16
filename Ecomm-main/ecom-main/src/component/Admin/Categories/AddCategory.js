import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import AdminService from "./../../../Services/AdminService"; // Replace with the actual path
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [adminId, setAdminId] = useState(null);
  const [subdata, setSubdata] = useState({
    cid: "",
    name: "",
  });
  const service = AdminService();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("adminDetails"));

    setAdminId(admin.superAdmin._id);
  }, []);

  useEffect(() => {
    // Load categories when the component mounts
    service.getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const addCategory = async () => {
    try {
      // Add logic to handle category addition
      const imageResponse = await service.addImage(selectedFile, adminId);
      // console.log(imageResponse)
      const categoryData = {
        ...formData,
        image: imageResponse.data.longUrl,
      };
      // console.log(categoryData)
      await service.addCategory(categoryData);

      setFormData({
        name: "",
        image: "",
      });
      setPhoto(null);
      toast.success("Category added successfully");
      // Add success notification
    } catch (error) {
      // Add error notification
      toast.error("Error adding category:");
      console.error("Error adding category:", error.message);
    }
  };

  console.log("when loading ..", categories);

  const addSubCategory = (e) => {
    e.preventDefault();

    try {
      service.addSubCategory(subdata);

      setSubdata({
        cid: "",
        name: "",
      });
      toast.success("Sub Category added successfully");
    } catch (error) {
      toast.error("Error adding Subcategory:");
      console.error("Error adding category:", error.message);
    }
  };

  const newData = (e) => {
    setSubdata({ ...subdata, [e.target.name]: e.target.value });
  };
  return (
    // <Modal
    //   open={isOpen}
    //   onClose={onClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box className="modal-content">
    //     <div className="close-modal">
    //       <Button onClick={onClose}>Close</Button>
    //     </div>

    <div className="container-fluid" style={{ paddingTop: "20px" }}>
      <h2 className="mt-30 page-title">Categories</h2>
      <div className="card card-static-2 mb-30">
        <div className="card-title-2">
          <h4>Add New Category</h4>
        </div>
        <div className="card-body-table">
          <div className="news-content-right pd-20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCategory();
              }}
            >
              <div className="form-group">
                <label className="form-label">Category Name*</label>
                <TextField
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category Image*</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      accept="image/png"
                      onChange={onFileSelected}
                      hidden
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile04"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>
                <div className="add-cate-img">
                  {photo && (
                    <img
                      src={photo}
                      alt=""
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </div>
              </div>
              <button className="save-btn hover-btn" type="submit">
                Add New Category
              </button>
            </form>
          </div>
        </div>
      </div>
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
    </div>
    //   </Box>
    // </Modal>
  );
};

export default AddCategory;
