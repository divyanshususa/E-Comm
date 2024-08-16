import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import AdminService from "../../../Services/AdminService";

const AddOfferComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState("");
  const [adminId, setAdminId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    discount: 0,
    category: "",
    adlink: "",
    addes: "",
  });

  const service = AdminService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const admin = JSON.parse(localStorage.getItem("adminDetails"));
        setAdminId(admin.superAdmin._id);
        const response = await service.getCategories();
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      setPhoto(event.target.result);
    };
  };

  const addOffer = async () => {
    try {
      const imageResponse = await service.addImage(selectedFile, adminId);

      const offerData = {
        ...formData,
        adlink: imageResponse.data.longUrl,
      };

      await service.addOffer(offerData);

      if (formData.category === "") {
        service.addOfferCategory(offerData);
      } else {
      }

      setFormData({
        title: "",
        discount: 0,
        category: "",
        adlink: "",
        addes: "",
      });

      setPhoto("");
      // showNotification('snackbar-success', 'Data added Successfully...!!!', 'bottom', 'center');
    } catch (error) {
      console.error("Error adding offer:", error.message);
      // showNotification('snackbar-danger', 'Error...!!!', 'bottom', 'center');
    }
  };

  const showNotification = (colorName, text, placementFrom, placementAlign) => {
    // Implement your notification logic here
  };

  return (
    // <Modal
    //   open={true} // You can conditionally set the open state based on your requirementF
    // onClose={() => navigate('/admin')} // Adjust the route as needed
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box className="modal-content">
    <>
      <div className="container-fluid" style={{ paddingTop: "20px" }}>
        <h2 className="mt-30 page-title">Offers</h2>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-6">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Add New Offer</h4>
              </div>
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addOffer();
                    }}
                  >
                    <div className="form-group">
                      <label className="form-label">Title*</label>
                      <TextField
                        type="text"
                        className="form-control"
                        placeholder="Offer Title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Discount*</label>
                      <TextField
                        type="number"
                        className="form-control"
                        placeholder="Enter %"
                        value={formData.discount}
                        onChange={(e) =>
                          setFormData({ ...formData, discount: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category*</label>
                      <FormControl className="form-control">
                        <InputLabel id="category-label">
                          --Select Category--
                        </InputLabel>
                        <Select
                          labelId="category-label"
                          id="category"
                          value={formData.category}
                          label="--Select Category--"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="">
                            <em>--Select Category--</em>
                          </MenuItem>
                          {categories &&
                            Array.isArray(categories) &&
                            categories.map((category) => (
                              <MenuItem
                                key={category._id}
                                value={category.name}
                              >
                                {category.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Offer Image*</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            accept="image/png"
                            onChange={onFileSelected}
                            style={{ width: "100%" }}
                            hidden
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile04"
                            style={{ width: "570px" }}
                          >
                            Choose Image
                          </label>
                        </div>
                      </div>
                      <div
                        className="offer-img mt-3"
                        style={{ display: photo ? "block" : "none" }}
                      >
                        <img
                          src={photo}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description*</label>
                      <div className="card card-editor">
                        <div className="content-editor">
                          <textarea
                            className="text-control"
                            placeholder="Enter Description"
                            value={formData.addes}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                addes: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      className="save-btn hover-btn"
                      type="submit"
                      disabled={!formData.title || !formData.discount}
                    >
                      Add New Offer
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Box> */}
      {/* </Modal> */}
    </>
  );
};

export default AddOfferComponent;
