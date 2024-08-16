import React from "react";
import "./modal.css";
// import ReactModal from 'react-modal';
import { Modal, Button, Box } from "@mui/material";

const CustomerProfileModal = ({ user, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-content">
        {/* Your existing modal content goes here */}
        <div className="close-modal">
          <Button onClick={onClose}>Close</Button>
        </div>

        <div style={{ paddingTop: "20px", width: "100% " }}>
          <div
            className="card card-static-2 mt-5"
            style={{ backgroundColor: "white" }}
          >
            <div className="card-body-table">
              <div className="shopowner-content-left text-center pd-20">
                <div className="customer_img">
                  <img src="assets/images/avatar/img-1.jpg" alt="" />
                </div>
                {/* {console.log(user)} */}
                <div
                  className="shopowner-dt-left"
                  style={{ marginTop: "18px" }}
                >
                  <h4>{user.name}</h4>
                  <span>Customer</span>
                </div>
                <div className="shopowner-dts">
                  <div className="shopowner-dt-list">
                    <span className="left-dt">Name</span>
                    <span className="right-dt">{user.name}</span>
                  </div>
                  <div className="shopowner-dt-list">
                    <span className="left-dt">Email</span>
                    <span className="right-dt">
                      <a className="__cf_email__">{user.email}</a>
                    </span>
                  </div>
                  <div className="shopowner-dt-list">
                    <span className="left-dt">Phone</span>
                    <span className="right-dt">{user.phone}</span>
                  </div>
                  <div className="shopowner-dt-list">
                    <span className="left-dt">Address</span>
                    <span className="right-dt">
                      {user.currentaddress && user.currentaddress.city},{" "}
                      {user.currentaddress && user.currentaddress.state}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomerProfileModal;
