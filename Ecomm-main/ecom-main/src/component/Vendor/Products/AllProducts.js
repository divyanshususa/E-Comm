import React, { useState, useEffect } from "react";
import axios from "axios";
import "./allProduct.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import VendorService from "../../../Services/VendorService";
import UpdateProductDialog from "./../../Admin/Products/UpdateProductDialog";
import { Pagination } from "@mui/material";

const AllProducts = () => {
  const [listData, setListData] = useState([]); // Replace with your actual data

  const [currVendor, setCurrVendor] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [label, setLabel] = useState("");
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [ActiveProduct, setProductActive] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const ven = localStorage.getItem('vendorDetails')
        const ven = JSON.parse(localStorage.getItem("vendorDetails"));
        console.log("uahsdfkjhsk--->", ven);

        setCurrVendor(ven.employer);
        const response = await VendorService.getVendorproducts(
          ven.employer._id
        );
        setListData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      // await axios.post('https://swiftmart-416707.el.r.appspot.com/api/products/deleteproduct', { id: productId });
      await VendorService.deleteProduct({ id: productId });
      // Fetch updated data after successful delete
      const updatedList = await await VendorService.getVendorproducts(
        currVendor._id
      );
      setListData(updatedList.data);
      setFilteredData(updatedList.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = listData.filter(
      (product) =>
        (product.pname && product.pname.toLowerCase().includes(searchTerm)) ||
        (product.pcat && product.pcat.toLowerCase().includes(searchTerm))
    );
    setFilteredData(filtered);
  };

  const handleChangePage = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setFieldToUpdate("");
    setLabel("");
  };

  const handleOpenUpdateDialog = (field, labelText, productId, isActive) => {
    setUpdateDialogOpen(true);
    setFieldToUpdate(field);
    setLabel(labelText);
    setProductIdToUpdate(productId);
    setProductActive(isActive);
  };

  const handleUpdateField = async (value) => {
    try {
      const updateData = { cid: productIdToUpdate };

      if (fieldToUpdate === "name") {
        updateData.pname = value;
      } else if (fieldToUpdate === "dprice") {
        updateData.dprice = value;
      } else if (fieldToUpdate === "quantity") {
        updateData.quantity = value;
      } else if (fieldToUpdate === "active") {
        updateData.active = value;
      }

      await axios.post(
        `https://swiftmart-416707.el.r.appspot.com/api/products/update${fieldToUpdate}`,
        updateData
      );

      // Fetch updated data after successful update
      const updatedList = await VendorService.getVendorproducts(currVendor._id);
      setListData(updatedList.data);
      setFilteredData(updatedList.data);
    } catch (error) {
      console.error("Error updating field:", error);
    }

    handleCloseUpdateDialog();
  };

  const openPopUp = (product) => {
    // Implement your logic for opening a confirmation popupx
    if (window.confirm(`Are you sure you want to delete ${product.pname}?`)) {
      handleDeleteProduct(product._id);
    }
  };
  // const activeProduct = async (productId, isActive) => {
  //   try {
  //     // Send the update request to your API
  //     await axios.post('https://swiftmart-416707.el.r.appspot.com/api/products/update', {
  //       cid: productId,
  //       active: isActive,
  //     });

  //     // Fetch updated data after successful update
  //     const updatedList = await VendorService.getVendorproducts(currVendor._id)
  //     setListData(updatedList.data);
  //     setFilteredData(updatedList.data);
  //   } catch (error) {
  //     console.error('Error updating active state:', error);
  //   }
  // };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredData.slice(firstIndex, lastIndex);

  return (
    <div
      className="container-fluid"
      style={{ marginTop: "55px", paddingTop: "5px" }}
    >
      <h2 className="mt-30 page-title">Products</h2>

      <div className="row justify-content-between">
        <div className="col-lg-5 col-md-6">
          <div className="bulk-section">
            <div className="search-by-name-input">
              <TextField
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={handleSearch}
                // style={{height:'35px'}}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6" style={{ textAlign: "end" }}>
          <Button
            component={Link}
            to="/add-product"
            className="add-btn hover-btn"
            style={{ paddingLeft: "48px", paddingRight: "48px" }}
          >
            Add New
          </Button>
          <Button
            component={Link}
            to="/admin/products/excel"
            className="add-btn hover-btn"
          >
            Import from Excel
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Add your table headers here */}
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actual Price</TableCell>
                <TableCell>Sell Price</TableCell>
                {/* <TableCell>Active</TableCell> */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((product, index) => (
                <TableRow key={index}>
                  {/* Populate table cells with product data */}

                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="cate-img-5">
                      <img src={product.pphoto} alt="" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.pname}
                    <IconButton
                      onClick={() =>
                        handleOpenUpdateDialog(
                          "name",
                          "Product Name",
                          product._id
                        )
                      }
                      title="Edit"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{product.pcat}</TableCell>
                  <TableCell>
                    {product.quantity}
                    <IconButton
                      onClick={() =>
                        handleOpenUpdateDialog(
                          "quantity",
                          "Quantity",
                          product._id
                        )
                      }
                      title="Edit"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{product.aprice}</TableCell>
                  <TableCell>
                    {product.dprice}
                    <IconButton
                      onClick={() =>
                        handleOpenUpdateDialog(
                          "dprice",
                          "Discount Price",
                          product._id
                        )
                      }
                      title="Edit"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  {/* <TableCell>
                    <IconButton>
                    <Switch
                      onChange={(e) => activeProduct(product._id, e.target.checked)}
                      checked={product.active}
                    />
                    </IconButton>
                  

                  </TableCell> */}
                  <TableCell>
                    {/* Add your action buttons (View, Edit, Delete) */}

                    {/* <IconButton
                              onClick={() => openDialog(product)}
                              title="View"
                              color="primary"
                            >
                              <VisibilityIcon />
                            </IconButton> */}
                    {/* <IconButton
                              onClick={() => openEditDialog(product)}
                              title="Edit"
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton> */}
                    <IconButton
                      onClick={() => openPopUp(product)}
                      title="Delete"
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          className="mt-2"
        />
      </div>
      <UpdateProductDialog
        open={updateDialogOpen}
        handleClose={handleCloseUpdateDialog}
        updateField={handleUpdateField}
        fieldToUpdate={fieldToUpdate}
        label={label}
      />
    </div>
  );
};

export default AllProducts;
