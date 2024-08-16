import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
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
  FormControl,
  Input,
  Collapse,
  Typography,
  IconButton,
  Box,
  TablePagination,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import AdminService from "../../../Services/AdminService";
import { useParams } from "react-router-dom";

const OrderStatus = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [expandedElement, setExpandedElement] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchBool, setSearchBool] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const service = AdminService();

  const { status } = useParams();

  const updateStatus = async (value, order) => {
    // Implement your logic for updating the order status
    console.log(
      `Updating status to ${value} for order ${order.ono} and ${order._id}`
    );
    try {
      const data = {
        ostatus: value,
      };

      await service.updateStatus(order._id, data);

      const response = await axios.get(
        "https://swiftmart-416707.el.r.appspot.com/api/orders/getallorders"
      );
      setListData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  const generateInvoice = (order) => {
    // Implement your logic for generating the invoice
    console.log(`Generating invoice for order`, order);
    setSelectedOrder(order);
    setInvoiceModalOpen(true);
    // navigate('/invoice')
  };

  const applyFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.trim() === "") {
      setSearchBool(false);
    } else {
      const filtered = listData.filter(
        (order) =>
          (order.ono && order.ono.toLowerCase().includes(searchTerm)) ||
          (order.oaddress &&
            order.oaddress.toLowerCase().includes(searchTerm)) ||
          (order.ostatus && order.ostatus.toLowerCase().includes(searchTerm))
      );
      setFilteredData(filtered);
      setSearchBool(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swiftmart-416707.el.r.appspot.com/api/orders/ordersByStatus/${status}`
        );
        setListData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [status]);

  return (
    <div className="container-fluid" style={{ marginTop: "5px" }}>
      <h2 className="mt-30 page-title">Orders</h2>
      <div className="justify-content-between">
        <div className="col-lg-5 col-md-6" style={{ width: "100%" }}>
          <div className="bulk-section mb-30">
            <div className="search-by-name-input">
              <Input
                type="text"
                className="form-control"
                placeholder="Search Order"
                onKeyUp={(event) => applyFilter(event)}
              />
            </div>
            {/* <FormControl>
              <Select className="form-control" onChange={(event) => applyFilter(event)}>
                <MenuItem value="Ordered">Ordered</MenuItem>
                <MenuItem value="Placed">Placed</MenuItem>
                <MenuItem value="Dispatched">Dispatched</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
              <Button variant="contained" className="status-btn hover-btn">
                Search Order
              </Button>
            </FormControl> */}
          </div>
        </div>
        {/* 
        <div className="col-lg-6" style={{ textAlign: 'end' }}>
          <Button variant="contained" className="add-btn hover-btn me-2" onClick={() => console.log('Export Orders to Excel')}>
            Export Orders to Excel
          </Button>
          <Button variant="contained" className="add-btn hover-btn" onClick={() => console.log('Update Delivery Charges')}>
            Update Delivery Charges
          </Button>
        </div> */}

        <div className="col-lg-12 col-md-12">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      textAlign: "center",
                      paddingLeft: "40px",
                      width: "170px",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Ordered Date
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>Address</TableCell>
                  <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell style={{ textAlign: "center" }}>Total</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Actions{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(searchBool ? filteredData : listData).map((order, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        style={{ textAlign: "center", paddingLeft: "40px" }}
                      >
                        {order.ono}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {order.odate}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {order.oaddress}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <FormControl>
                          <Select
                            value={order.ostatus}
                            onChange={(event) =>
                              updateStatus(event.target.value, order)
                            }
                          >
                            <MenuItem value="Ordered">Ordered</MenuItem>
                            <MenuItem value="Placed">Placed</MenuItem>
                            <MenuItem value="Dispatched">Dispatched</MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {order.oprice}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <IconButton
                          onClick={() => generateInvoice(order)}
                          title="Generate Invoice"
                          style={{ cursor: "pointer", color: "#f55d2c" }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse in={expandedElement === order}>
                          <Box margin={1}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              Products
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Product Name</TableCell>
                                  <TableCell>Quantity</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.ocart.map((item, i) => (
                                  <TableRow key={i}>
                                    <TableCell>{item.item}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={Math.ceil(
                (searchBool ? filteredData : listData).length / 5
              )}
              rowsPerPage={5}
              page={0}
              onChangePage={() => {}}
              onChangeRowsPerPage={() => {}}
            />
          </TableContainer>
        </div>
      </div>
      <InvoiceModal
        open={invoiceModalOpen}
        handleClose={() => setInvoiceModalOpen(false)}
        orderData={selectedOrder}
      />
    </div>
  );
};

export default OrderStatus;
