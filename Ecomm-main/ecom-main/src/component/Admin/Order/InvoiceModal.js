import React from "react";
import { Modal, Button, Box } from "@mui/material";
import OrdersInvoice from "./OrdersInvoice";
import "./Invoicemodal.css";
const InvoiceModal = ({ open, handleClose, orderData }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="invoice-content">
        <div className="close-modal  ">
          <Button onClick={handleClose}>Close</Button>
        </div>
        <div style={{ marginTop: "35px" }}>
          <OrdersInvoice orderData={orderData} />
        </div>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
