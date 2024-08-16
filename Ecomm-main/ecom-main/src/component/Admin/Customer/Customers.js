import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomerProfileModal from "./CustomerProfileModal";
import config from "../../../configuration/config";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchBool, setSearchBool] = useState(false);
  const [searchedCustomers, setSearchedCustomers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [customerProfile, setCustomerProfile] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://swiftmart-416707.el.r.appspot.com/api/users/getUsers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const applyFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setInputValue(searchTerm);

    if (searchTerm.trim() === "") {
      setSearchBool(false);
    } else {
      const filteredCustomers = customers.filter(
        (customer) =>
          customer.name && customer.name.toLowerCase().includes(searchTerm)
      );

      setSearchedCustomers(filteredCustomers);
      setSearchBool(true);
    }
  };

  const findCustomer = async (id) => {
    try {
      const response = await axios.get(
        `${config.baseUrl}/api/users/getprofile?id=${id}`
      );
      setCustomerProfile(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching customer profile:", error);
    }
  };

  const closeCustomerProfileModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = (searchBool ? searchedCustomers : customers).slice(
    firstIndex,
    lastIndex
  );

  return (
    <div className="container-fluid" style={{ marginTop: "75px" }}>
      {openModal && (
        <CustomerProfileModal
          user={customerProfile}
          isOpen={openModal}
          onClose={closeCustomerProfileModal}
        />
      )}
      <h2 className="mt-30 page-title">Customers</h2>

      <div className="search-by-name-input mt-3 mb-5">
        <TextField
          // style={{ width: '20%' }
          type="text"
          // className="form-control"
          placeholder="Search Customer by Name"
          value={inputValue}
          onChange={applyFilter}
        />
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((customer, i) => (
                    <TableRow key={i}>
                      <TableCell style={{ textAlign: "center" }}>
                        {i + 1}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <div className="cate-img-6">
                          <img
                            src="/assets/images/avatar/img-1.jpg"
                            alt=""
                            style={{ width: "50px", height: "50px" }}
                          />
                        </div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {customer.name}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <a href={`mailto:${customer.email}`}>
                          {customer.email}
                        </a>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {customer.phone}
                      </TableCell>
                      <TableCell className="action-btns">
                        <IconButton
                          className="edit-btn"
                          title="View"
                          onClick={() => findCustomer(customer._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        {/* Add other IconButton components for additional actions */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(
                (searchBool ? searchedCustomers : customers).length /
                  itemsPerPage
              )}
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Customers;
