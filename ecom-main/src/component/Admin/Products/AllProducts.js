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
  Checkbox,
  IconButton,
} from "@mui/material";
import { Pagination } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateProductDialog from "./UpdateProductDialog";
const AllProducts = () => {
  const [listData, setListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [label, setLabel] = useState("");
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [ActiveProduct, setProductActive] = useState(null);

  useEffect(() => {
    // Fetch your data from the API or wherever you get it
    axios
      .get("http://localhost:5000/api/products/getallproducts")
      .then((response) => {
        setListData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredData.slice(firstIndex, lastIndex);

  const openDialog = (product) => {
    // Implement your logic for opening a dialog
  };

  const openEditDialog = (product) => {
    // Implement your logic for opening an edit dialog
  };

  // const handleOpenUpdateDialog = (field, labelText, productId) => {

  //   setUpdateDialogOpen(true);
  //   setFieldToUpdate(field);
  //   setLabel(labelText);
  //   setProductIdToUpdate(productId);
  // };

  // const handleUpdateField = async (value) => {
  //   try {
  //     const updateData = { cid: productIdToUpdate };

  //     if (fieldToUpdate === 'name') {
  //       updateData.pname = value;
  //     } else if (fieldToUpdate === 'dprice') {
  //       updateData.dprice = value;
  //     } else if (fieldToUpdate === 'quantity') {
  //       updateData.quantity = value;
  //     }

  //     console.log("updated data ..", updateData)

  //     await axios.post(`http://localhost:5000/api/products/update${fieldToUpdate}`, updateData);

  //     // Fetch updated data after successful update
  //     const updatedList = await axios.get('http://localhost:5000/api/products/getallproducts');
  //     setListData(updatedList.data);
  //     setFilteredData(updatedList.data);
  //   } catch (error) {
  //     console.error('Error updating field:', error);
  //   }

  //   handleCloseUpdateDialog();
  // };

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
        `http://localhost:5000/api/products/update${fieldToUpdate}`,
        updateData
      );

      // Fetch updated data after successful update
      const updatedList = await axios.get(
        "http://localhost:5000/api/products/getallproducts"
      );
      setListData(updatedList.data);
      setFilteredData(updatedList.data);
    } catch (error) {
      console.error("Error updating field:", error);
    }

    handleCloseUpdateDialog();
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/products/deleteproduct", {
        id: productId,
      });

      // Fetch updated data after successful delete
      const updatedList = await axios.get(
        "http://localhost:5000/api/products/getallproducts"
      );
      setListData(updatedList.data);
      setFilteredData(updatedList.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openPopUp = (product) => {
    // Implement your logic for opening a confirmation popupx
    if (window.confirm(`Are you sure you want to delete ${product.pname}?`)) {
      handleDeleteProduct(product._id);
    }
  };
  const activeProduct = async (productId, isActive) => {
    try {
      // Send the update request to your API
      await axios.post("http://localhost:5000/api/products/update", {
        cid: productId,
        active: isActive,
      });

      // Fetch updated data after successful update
      const updatedList = await axios.get(
        "http://localhost:5000/api/products/getallproducts"
      );
      setListData(updatedList.data);
      setFilteredData(updatedList.data);
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: "5px" }}>
      <h2 className="mt-30 page-title">Products</h2>

      <div className="row justify-content-between">
        <div className="col-lg-5 col-md-6">
          <div className="bulk-section">
            <div className="search-by-name-input">
              <TextField
                type="text"
                // className="form-control"
                placeholder="Search"
                onChange={handleSearch}
                // style={{height:'35px'}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12 col-md-12 mt-5">
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
                <TableCell>Active</TableCell>
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
                      <img
                        src={product.pphoto}
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
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
                  <TableCell>
                    <IconButton>
                      <Switch
                        onChange={(e) =>
                          activeProduct(product._id, e.target.checked)
                        }
                        checked={product.active}
                      />
                    </IconButton>

                    {/* <Checkbox
                      color="warn"
                      checked={product.active}
                      // Add your onChange handler
                    /> */}
                  </TableCell>
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

// import React, { useState ,useEffect} from 'react';
// import axios from 'axios';
// import './allProduct.css'
// import {
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Button,
//   Switch,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { useNavigate } from 'react-router-dom';
// import dashboardService from '../../../Services/dashboardService';
// import { useGetLocalStorage } from '../../../Hooks/useGetLocalStorage';
// import config from '../../../configuration/config';

// // import SlideToggle from '@mui/material/SlideToggle';
// // import { Switch as SlideToggle } from '@mui/material';

// const AllProducts = () => {
//   const navigate = useNavigate();

//   const [listData, setListData] = useState([]); // Replace with your actual data
//   const [inputValue, setInputValue] = useState('');
//   // const{ userToken} = JSON.parse(useGetLocalStorage('userToken'));
//   const userToken=localStorage.getItem('userToken')

//   const url=`${config.baseUrl}/api/products/getallproducts`

//   const displayedColumns = [
//     'id',
//     'image',
//     'name',
//     'category',
//     'quantity',
//     'price',
//     'dprice',
//     'offer',
//     'action',
//   ];
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dashboardService.getApiCall(url, userToken).then((res)=>{
//           setListData(res.data);
//         })
//         // const response = await axios.get('http://localhost:5000/api/products/getallproducts');
//         // setListData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);
//   const applyFilter = (event) => {
//     setInputValue(event.target.value);
//     // Implement your filtering logic here
//   };

//   const onChange = (product, event) => {
//     // Implement your logic for changing the offer status
//   };

//   const openDialog = (product) => {
//     // Implement your logic for opening a dialog
//   };

//   const openEditDialog = (product) => {
//     // Implement your logic for opening an edit dialog
//   };

//   const openPopUp = (product) => {
//     // Implement your logic for opening a confirmation popup
//   };

//   return (
//     <div className="container-fluid" style={{ marginTop: '55px', paddingTop: '5px' }}>
//       <h2 className="mt-30 page-title">Products</h2>

//       <div className="row justify-content-between">
//         <div className="col-lg-5 col-md-6">
//           <div className="bulk-section">
//             <div className="search-by-name-input">
//               <Input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search"
//                 value={inputValue}
//                 onChange={applyFilter}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-6" style={{ textAlign: 'end' }}>
//           {/* <Button
//             component={Link}
//             to="/admin/add-product"
//             className="add-btn hover-btn"
//             style={{ paddingLeft: '48px', paddingRight: '48px' }}
//           >
//             Add New
//           </Button> */}
//           {/* <Button
//             component={Link}
//             to="/admin/products/excel"
//             className="add-btn hover-btn"
//           >
//             Import from Excel
//           </Button> */}
//         </div>
//         <div className="col-lg-12 col-md-12 " style={{backgroundColor:'white', marginTop:'10px'}}>
//           <div className="card card-static-2 mt-30 mb-30" style={{backgroundColor:'white'}}>
//             <div className="card-title-2">
//               <h4>All Products</h4>
//             </div>
//             <div className="card-body-table">
//               <div className="table-responsive">
//                 <TableContainer component={Paper}>
//                   <Table>
//                     <TableHead>
//                       <TableRow className="custom-header-bg">
//                         {displayedColumns.map((column) => (
//                           <TableCell key={column} className="custom-header">
//                             {column.toUpperCase()}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {listData.map((product, index) => (
//                         <TableRow key={index} className="mat-row">
//                           <TableCell>{index + 1}</TableCell>
//                           <TableCell>
//                             <div className="cate-img-5">
//                               <img src={product.pphoto} alt="" />
//                             </div>
//                           </TableCell>
//                           <TableCell>{product.pname}</TableCell>
//                           <TableCell>{product.pcat}</TableCell>
//                           <TableCell>{product.quantity}</TableCell>
//                           <TableCell>{product.aprice}</TableCell>
//                           <TableCell>{product.dprice}</TableCell>
//                           <TableCell style={{ paddingLeft: '10px' }}>
//                           {/* <Switch
//                               color="warn"
//                               checked={product.poffer === 'yes'}
//                               onChange={(event) => onChange(product, event)}
//                             >
//                               Add Offer
//                             </Switch> */}
//                           </TableCell>
//                           <TableCell className="action-btns">
//                             <IconButton
//                               onClick={() => openDialog(product)}
//                               title="View"
//                               color="primary"
//                             >
//                               <VisibilityIcon />
//                             </IconButton>
//                             <IconButton
//                               onClick={() => openEditDialog(product)}
//                               title="Edit"
//                               color="primary"
//                             >
//                               <EditIcon />
//                             </IconButton>
//                             <IconButton
//                               onClick={() => openPopUp(product)}
//                               title="Delete"
//                               color="secondary"
//                             >
//                               <DeleteIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
