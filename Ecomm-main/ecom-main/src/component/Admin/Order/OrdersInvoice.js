import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import generatePDF from "react-to-pdf";

const OrdersInvoice = ({ orderData }) => {
  const [currUser, setCurrUser] = useState(null);
  const targetRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swiftmart-416707.el.r.appspot.com/api/users/${orderData.uid}`
        );
        setCurrUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [orderData.uid]);

  return (
    <div ref={targetRef}>
      <section id="section" style={{ padding: 0 }}>
        <header>
          <div
            className="row"
            style={{ height: "150px", backgroundColor: "rgb(107 220 165)" }}
          >
            <div
              className="col-4 d-flex align-items-center"
              style={{ marginLeft: "20px" }}
            >
              <a
                className="delete-btn"
                title="Generate Invoice"
                style={{ cursor: "pointer", color: "white" }}
              >
                <i
                  style={{ fontSize: "18px" }}
                  className="fas fa-file-invoice me-1"
                ></i>
              </a>
              <h3 style={{ color: "white" }}>Invoice</h3>
            </div>
            <div className="col-7 d-block align-items-center mt-2">
              <h5 style={{ textAlign: "end", color: "white" }}>
                Susakjgyo PVT. LTD.
              </h5>
              <p style={{ textAlign: "end", color: "white" }}>
                MG road , gurgaon, Haryana{" "}
              </p>
              <p style={{ textAlign: "end", color: "white" }}>
                Haryana, HR-121102 IN
              </p>
              <p style={{ textAlign: "end", color: "white" }}>
                Mob No.: +91 6260371700
              </p>
            </div>
          </div>
        </header>

        <body>
          <div className="upper-section" style={{ padding: "15px 20px" }}>
            <div className="row">
              <div className="col-6 d-block">
                <p className="mb-3">BILL TO:</p>
                <h5 style={{ textTransform: "uppercase" }}>{currUser?.name}</h5>
                <p className="mt-1">{orderData?.oaddress.addressline}</p>
                <p>{orderData?.oaddress.city}</p>
                <p>{orderData?.oaddress.country}</p>
                <p>{orderData?.oaddress.pincode}</p>
              </div>
              <div className="col-6 d-block">
                <p style={{ textAlign: "end" }}>INVOICE#</p>
                <p style={{ textAlign: "end" }}>
                  {" "}
                  <b>{orderData?.ono}</b>{" "}
                </p>
                <p className="mt-1" style={{ textAlign: "end" }}>
                  DATE
                </p>
                <p style={{ textAlign: "end" }}>
                  {" "}
                  <b>{new Date(orderData?.odate).toLocaleDateString()}</b>{" "}
                </p>
                <p className="mt-1" style={{ textAlign: "end" }}>
                  PAYMENT MODE
                </p>
                <p style={{ textAlign: "end" }}>
                  <b>
                    {orderData?.rpayid === "cod"
                      ? "Cash On Delivery"
                      : "Razerpay"}
                  </b>
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="main-section" style={{ padding: "15px 20px" }}>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <div style={{ border: "1px solid gray", borderRadius: "5px" }}>
                  <table
                    style={{ width: "600px" }}
                    className="table table-striped"
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }} scope="col">
                          SR. NO.
                        </th>
                        <th style={{ textAlign: "center" }} scope="col">
                          ITEM NAME
                        </th>
                        <th style={{ textAlign: "center" }} scope="col">
                          PRICE
                        </th>
                        <th style={{ textAlign: "center" }} scope="col">
                          QUANTITY
                        </th>
                        <th style={{ textAlign: "center" }} scope="col">
                          AMOUNT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData?.ocart.map((item, i) => (
                        <tr key={i}>
                          <td style={{ textAlign: "center" }}>{i + 1}</td>
                          <td style={{ textAlign: "center" }}>{item.item}</td>
                          <td style={{ textAlign: "center" }}>{item.price}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.quantity}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          colSpan="3"
                          style={{ backgroundColor: "rgb(206 211 220)" }}
                        >
                          <div className="row">
                            <div
                              className="col-6 d-flex justify-content-end"
                              style={{ paddingRight: "0" }}
                            >
                              <p>Current Status: </p>
                            </div>
                            <div
                              className="col-6 d-flex justify-content-start"
                              style={{ paddingLeft: "5px" }}
                            >
                              <h5>{orderData?.ostatus}</h5>
                            </div>
                          </div>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "rgb(107 220 165)",
                          }}
                        >
                          <p style={{ color: "white" }}>TOTAL:</p>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "rgb(107 220 165)",
                          }}
                        >
                          <h5 style={{ color: "white" }}>
                            {orderData?.oprice}
                          </h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </body>
      </section>

      <div className="row mt-3">
        <div className="col d-flex justify-content-center">
          <button
            onClick={() => generatePDF(targetRef, { filename: "Invoice.pdf" })}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersInvoice;
