import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import { Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminService from "../../../Services/AdminService";

const OffersList = () => {
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const service = AdminService();

  const applyFilter = (event) => {
    setSearchText(event.target.value);
    // Filter logic can be applied here based on searchText
    // You may want to update the listData based on the searchText
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://swiftmart-416707.el.r.appspot.com/api/images/getbanners"
        );
        setListData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteOffer = async (offerid) => {
    try {
      // Make an API call to delete the category
      console.log("clicked", offerid);
      const data = {
        id: offerid,
      };

      await service.deleteOffer(data);

      // Update the list of categories after deletion
      const updatedCategories = listData.filter(
        (offer) => offer._id !== offerid
      );
      setListData(updatedCategories);

      // showNotification('snackbar-success', 'Category deleted Successfully...!!!', 'bottom', 'center');
    } catch (error) {
      console.error("Error deleting category:", error.message);
      // showNotification('snackbar-danger', 'Error deleting category...!!!', 'bottom', 'center');
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = listData.slice(firstIndex, lastIndex);

  return (
    <div
      className="container-fluid"
      style={{ marginTop: "55px", paddingTop: "5px" }}
    >
      <h2 className="mt-30 page-title">Offers</h2>

      <div className="row justify-content-between">
        <div className="col-lg-5 col-md-6">
          <div className="bulk-section">
            <div className="search-by-name-input">
              <TextField
                type="text"
                // className="form-control"
                placeholder="Search Offer"
                value={searchText}
                onChange={applyFilter}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <i className="fas fa-search"></i>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <a className="add-btn hover-btn" href="/admin/add-offer">
            Add New
          </a>
        </div>

        <div className="col-lg-12 col-md-12">
          <div
            className="card card-static-2 mt-30 mb-30"
            style={{ backgroundColor: "white" }}
          >
            <div className="card-title-2">
              <h4>All Offers</h4>
            </div>
            <div className="card-body-table">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "60px" }}>ID</TableCell>
                      <TableCell style={{ width: "100px" }}>Image</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentItems.map((offer, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="offer-img">
                            {/* Assuming adlink is a property in the API response */}
                            <img
                              src={offer.adlink}
                              alt="img"
                              style={{ width: "80px", height: "80px" }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>📢{offer.tittle}</TableCell>
                        <TableCell>{offer.addes}</TableCell>
                        <TableCell>
                          <IconButton
                            className="delete-btn"
                            title="Delete"
                            onClick={() => deleteOffer(offer._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {listData.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No data matching the filter "{searchText}"
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{ marginTop: "15px" }}>
                <Pagination
                  count={Math.ceil(listData.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersList;
