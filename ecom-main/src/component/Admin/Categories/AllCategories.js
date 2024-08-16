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
  Switch,
  IconButton,
} from "@mui/material";
import { Pagination } from "@mui/material";
import dashboardService from "../../../Services/dashboardService";
// import { useGetLocalStorage } from '../../../Hooks/useGetLocalStorage';
import config from "../../../configuration/config";
import AddCategory from "./AddCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminService from "../../../Services/AdminService";

const AllCategories = () => {
  const [listData, setListData] = useState([]);
  const [searchBool, setSearchBool] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchCategory, setSearchedCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const url = `${config.baseUrl}/api/category/getcategories`;
  const service = AdminService();

  useEffect(() => {
    dashboardService.getApiCall(url, userToken).then((res) => {
      setListData(res.data);
    });
  }, []);

  const applyFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setInputValue(searchTerm);

    if (searchTerm.trim() === "") {
      setSearchBool(false);
    } else {
      const filteredCategory = listData.filter((data) =>
        data.name.toLowerCase().includes(searchTerm)
      );
      setSearchedCategory(filteredCategory);
      setSearchBool(true);
    }
  };

  const openDialog = (category) => {
    // Implement your openDialog logic here
  };

  const deleteCategory = async (catid) => {
    try {
      // Make an API call to delete the category
      console.log("clicked", catid);
      const data = {
        id: catid,
      };

      await service.deleteCategory(data);

      // Update the list of categories after deletion
      const updatedCategories = listData.filter(
        (category) => category._id !== catid
      );
      setListData(updatedCategories);

      // showNotification('snackbar-success', 'Category deleted Successfully...!!!', 'bottom', 'center');
    } catch (error) {
      console.error("Error deleting category:", error.message);
      // showNotification('snackbar-danger', 'Error deleting category...!!!', 'bottom', 'center');
    }
  };

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const displayedColumns = ["id", "image", "name", "actions"];

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = (searchBool ? searchCategory : listData).slice(
    firstIndex,
    lastIndex
  );

  return (
    <div
      className="container-fluid"
      style={{ marginTop: "55px", paddingTop: "5px" }}
    >
      <h2 className="mt-30 page-title">Categories</h2>
      <div className="row justify-content-between">
        <div className="col-lg-5 col-md-6">
          <div className="bulk-section mt-30">
            <div
              className="search-by-name-input mb-5 d-flex align-items-center"
              style={{ gap: "3rem" }}
            >
              <TextField
                type="text"
                // className="form-control"
                placeholder="Search"
                value={inputValue}
                onChange={applyFilter}
              />
              <span className="add-btn hover-btn" onClick={openModal}>
                Add New
              </span>
            </div>
          </div>
        </div>
        {isOpen && <AddCategory isOpen={isOpen} onClose={openModal} />}

        <div className="col-lg-6"></div>

        <div className="col-lg-12 col-md-12">
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "100px", textAlign: "center" }}>
                      ID
                    </TableCell>
                    <TableCell style={{ width: "100px", textAlign: "center" }}>
                      Image
                    </TableCell>
                    <TableCell style={{ width: "100px", textAlign: "center" }}>
                      Name
                    </TableCell>
                    <TableCell style={{ width: "100px", textAlign: "center" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((category, i) => (
                    <TableRow key={i}>
                      <TableCell style={{ textAlign: "center" }}>
                        {i + 1}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        onClick={() => openDialog(category)}
                      >
                        <div className="cate-img">
                          <img
                            src={category.image}
                            alt=""
                            style={{ width: "80px", height: "80px" }}
                          />
                        </div>
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        onClick={() => openDialog(category)}
                      >
                        {category.name}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="action-btns"
                      >
                        {/* <IconButton
                          className="delete-btn"
                          title="Edit"
                          style={{ cursor: 'pointer' }}
                          onClick={() => openPopUp(category)}
                        >
                          {/* <EditIcon/> */}
                        {/* </IconButton>  */}
                        <IconButton
                          // className="delete-btn"
                          title="Delete"
                          style={{
                            cursor: "pointer",
                            backgroundColor: "white",
                          }}
                          onClick={() => deleteCategory(category._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Pagination
            count={Math.ceil(
              (searchBool ? searchCategory : listData).length / itemsPerPage
            )}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
