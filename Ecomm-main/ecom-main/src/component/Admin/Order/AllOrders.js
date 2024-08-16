import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
} from "@mui/material";
import { DateRange, FileDownload, Update } from "@mui/icons-material";
import InvoiceModal from "./InvoiceModal";
// Sample data - replace with your actual data

const AllOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [deliveryChargeDialogOpen, setDeliveryChargeDialogOpen] =
    useState(false);
  const [popupDialogOpen, setPopupDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orders, setOrders] = useState([]);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Fetch orders on component mount
    getOrders();
  }, []);

  const getOrders = async () => {
    // Fetch orders from your API
    // Replace the following line with your actual API call
    const response = await fetch(
      "https://swiftmart-416707.el.r.appspot.com/api/orders/getallorders"
    );
    const data = await response.json();
    // Reverse the order to match the Angular code
    const reversedOrders = data.reverse();
    setOrders(reversedOrders);
    setFilteredOrders(reversedOrders);
  };

  const filteredOrdersList = orders
    .filter((order) =>
      order.ostatus.toLowerCase().includes(filterStatus.toLowerCase())
    )
    .filter(
      (order) =>
        order.ono.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.oaddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportExcel = () => {
    // Implement your export logic here
  };

  const handleUpdateDeliveryCharges = () => {
    // Implement your update delivery charges logic here
  };

  const handleGenerateInvoice = (order) => {
    setSelectedOrder(order);
    setInvoiceModalOpen(true);
  };

  const handlePopupDialogOpen = () => {
    // Implement your popup dialog open logic here
  };

  const handlePopupDialogClose = () => {
    // Implement your popup dialog close logic here
  };

  const handleDeliveryChargeDialogClose = () => {
    // Implement your delivery charge dialog close logic here
  };

  const handleInvoiceDialogClose = () => {
    setInvoiceDialogOpen(false);
    // Implement your invoice dialog close logic here
  };

  return (
    <Container style={{ marginTop: 55, paddingTop: 5 }}>
      <Typography variant="h2" className="mt-30 page-title">
        Orders
      </Typography>
      <div className="row justify-content-between">
        <div className="col-lg-5 col-md-6">
          <div className="bulk-section mb-30">
            <div className="search-by-name-input">
              <TextField
                type="text"
                fullWidth
                placeholder="Search Order"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
            <div className="input-group">
              <FormControl fullWidth>
                <Select
                  value={filterStatus}
                  onChange={handleFilterStatusChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Ordered">Ordered</MenuItem>
                  <MenuItem value="Placed">Placed</MenuItem>
                  <MenuItem value="Dispatched">Dispatched</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
              <div className="input-group-append">
                <Button
                  className="status-btn hover-btn"
                  onClick={handleSearchInputChange}
                >
                  Search Order
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6" style={{ textAlign: "end" }}>
          <Button
            onClick={handleExportExcel}
            className="add-btn hover-btn me-2"
            style={{ cursor: "pointer" }}
          >
            Export Orders to Excel
            <FileDownload />
          </Button>
          <Button
            onClick={handleUpdateDeliveryCharges}
            className="add-btn hover-btn"
            style={{ cursor: "pointer" }}
          >
            Update Delivery Charges
            <Update />
          </Button>
        </div>

        <div className="col-lg-12 col-md-12">
          <Paper elevation={3} className="card card-static-2 mb-30">
            <div className="card-title-2">
              <h4>All Orders</h4>
            </div>
            <div className="card-body-table">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="custom-header-bg">
                      <TableCell>ID</TableCell>
                      <TableCell>Ordered Date</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredOrders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((order) => (
                        <React.Fragment key={order._id}>
                          <TableRow
                            className="example-element-row"
                            onClick={() =>
                              setExpandedOrder(
                                expandedOrder === order ? null : order
                              )
                            }
                          >
                            <TableCell>{order.ono}</TableCell>
                            <TableCell>{order.odate}</TableCell>
                            <TableCell>{order.oaddress}</TableCell>
                            <TableCell>
                              <FormControl>
                                <Select
                                  value={order.ostatus}
                                  // onChange={(e) => updateStatus(e.target.value, order)}
                                  style={{ margin: "10px 0px" }}
                                >
                                  <MenuItem value="Ordered">Ordered</MenuItem>
                                  <MenuItem value="Placed">Placed</MenuItem>
                                  <MenuItem value="Dispatched">
                                    Dispatched
                                  </MenuItem>
                                  <MenuItem value="Delivered">
                                    Delivered
                                  </MenuItem>
                                  <MenuItem value="Cancelled">
                                    Cancelled
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>{order.oprice}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => handleGenerateInvoice(order)}
                                title="Generate Invoice"
                              >
                                <FileDownload style={{ color: "#f55d2c" }} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          {expandedOrder === order && (
                            <TableRow>
                              <TableCell colSpan={6}>
                                <div className="example-element-detail">
                                  <div
                                    style={{
                                      padding: "50px 20px",
                                      width: "100%",
                                    }}
                                  >
                                    <div className="row">
                                      <div className="col-2">
                                        <h5>Products :</h5>
                                      </div>
                                      <div className="col-6">
                                        <div className="row">
                                          {order.ocart.map((item) => (
                                            <div
                                              key={item.id}
                                              className="col-6"
                                            >
                                              <strong>{item.name}</strong> (
                                              {item.quan})
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
          </Paper>
        </div>
      </div>

      <div hidden>
        <table
          id="excel-data"
          className="table align-middle"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Order No.</th>
              <th scope="col">Order Date</th>
              <th scope="col">Expected Delivery Date</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Name</th>
              <th scope="col">Pincode</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td style={{ textAlign: "center" }}>{order.ono}</td>
                <td style={{ textAlign: "center" }}>{order.odate}</td>
                <td style={{ textAlign: "center" }}>{order.edate}</td>
                <td style={{ textAlign: "center" }}>{order.oaddress}</td>
                <td style={{ textAlign: "center" }}>{order.ostatus}</td>
                <td style={{ textAlign: "center" }}>{order.oprice}</td>
                <td style={{ textAlign: "center" }}>
                  {order.rpayid === "cod" ? "Cash On Delivery" : "Razorpay"}
                </td>
                <td style={{ textAlign: "center" }}>{order.oaddress?.name}</td>
                <td style={{ textAlign: "center" }}>
                  {order.oaddress?.pincode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceModal
        open={invoiceModalOpen}
        handleClose={() => setInvoiceModalOpen(false)}
        orderData={selectedOrder}
      />
      {/* Implement your dialogs here */}
      <Dialog open={popupDialogOpen} onClose={handlePopupDialogClose}>
        {/* Popup Dialog Content */}
      </Dialog>

      <Dialog
        open={deliveryChargeDialogOpen}
        onClose={handleDeliveryChargeDialogClose}
      >
        {/* Delivery Charge Dialog Content */}
      </Dialog>

      <Dialog open={invoiceDialogOpen} onClose={handleInvoiceDialogClose}>
        <DialogTitle>Invoice Details</DialogTitle>
        <DialogContent>{/* Invoice Content */}</DialogContent>
        <DialogActions>
          <Button onClick={handleInvoiceDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllOrders;
