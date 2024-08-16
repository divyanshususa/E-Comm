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
  Select,
  MenuItem,
} from "@mui/material";
import "./sellers.css";
import { Pagination } from "@mui/material";

const Sellers = () => {
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const sSubmit = async (value, id) => {
    try {
      const response = await axios.post(
        `https://swiftmart-416707.el.r.appspot.com/api/vendors/update?id=${id}`,
        {
          active: value,
        }
      );

      console.log("Vendor updated:", response.data);

      const updatedList = listData.map((vendor) =>
        vendor._id === id ? { ...vendor, active: value } : vendor
      );
      setListData(updatedList);
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://swiftmart-416707.el.r.appspot.com/api/vendors/getEmployee"
        );
        setListData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = listData.slice(firstIndex, lastIndex);

  return (
    <div className="container-fluid" style={{ marginTop: "75px" }}>
      <h2 className="mt-30 page-title">Vendors</h2>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div
            className="card card-static-2 mb-30"
            style={{ backgroundColor: "white" }}
          >
            <div className="card-title-2">
              <h4>All Vendors</h4>
            </div>

            <div className="card-body-table">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="custom-header"
                      >
                        Image
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="custom-header"
                      >
                        Name
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="custom-header"
                      >
                        Email
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="custom-header"
                      >
                        Phone
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="custom-header"
                      >
                        Registration No
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="custom-header"
                      >
                        PAN No
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="custom-header"
                      >
                        Aadhaar No
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="custom-header"
                      >
                        Active/Deactive
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentItems.map((vendor) => (
                      <TableRow key={vendor._id} style={{ color: "black" }}>
                        <TableCell style={{ textAlign: "center" }}>
                          <span className="delivery-time">
                            <div className="cate-img-6">
                              <img
                                src="assets/images/avatar/img-1.jpg"
                                alt=""
                              />
                            </div>
                          </span>
                          <br />
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {vendor.name}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {vendor.email}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {vendor.phone}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {vendor.regno}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {vendor.panno}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {vendor.adharno}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Select
                            id="categtory"
                            name="active"
                            value={vendor.active}
                            onChange={(e) =>
                              sSubmit(e.target.value, vendor._id)
                            }
                          >
                            <MenuItem value="true">true</MenuItem>
                            <MenuItem value="false">false</MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default Sellers;
