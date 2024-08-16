import React, { useState } from "react";
import FormatPrice from "../../../Helpers/FormatPrice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";

const Checkout = ({ cartdata, setorderdata, setQrdata }) => {
  const { currencyType } = useSelector(state => state.currency);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    fullAddress: "",
    pincode: "",
    paymentMode: "",
  });
  const { carts, totalAmount } = useSelector((state) => state.allCart);

  console.log(carts);

  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("CurrentUser"));
      console.log("formdata", formData);

      setorderdata(formData);

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      const orderData = {
        odate: formattedDate,
        edate: formattedDate,
        oaddress: formData.fullAddress,
        oproduct: "",
        oprice: totalAmount,
        cart: carts?.map((product) => ({
          vid: product.vid,
          quantity: product.quantity,
          pid: product._id,
        })),
        rpayid: "some-payment-id",
        uid: user._id,
        vname: "",
        coupon: null, // You might want to include coupon data if applicable
      };

      const response = await axios.post(
        "https://swiftmart-416707.el.r.appspot.com/api/orders/placeorder",
        orderData
      );

      console.log("Order placed successfully:", response.data);
      setQrdata({
        uid: response.data.uid,
        vid: response.data.vid,
        oid: response.data._id,
      });

      if (response) {
        setTimeout(() => {
          setloading(true);
        }, 2000);
        setloading(false);
        navigate("/user/order-placed");
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  return (
    <div>
      <div className="row"></div>

      <div className="py-3 py-md-4 checkout">
        <div className="container">
          <h4>Checkout</h4>
          <hr />

          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="shadow bg-white p-3">
                <h4 className="text-primary">Order Summary</h4>
                <hr />

                {carts?.map((product, index) => (
                  <div key={index} className="row mb-3">
                    {console.log("product ....", product)}
                    <div className="col-md-3">
                      {/* Display product image */}
                      <img
                        src={product?.pphoto}
                        alt={product?.pname}
                        className="img-fluid"
                        style={{ width: "200px", height: "200px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      {/* Display product details */}
                      <h5>{product?.pname}</h5>
                      <p>Quantity: {product?.quantity}</p>
                      <p>
                        Price: <FormatPrice price={product?.aprice} type={currencyType} />
                      </p>
                      <p>
                        Discounted Price:{" "}
                        <FormatPrice price={product?.dprice} type={currencyType} />
                      </p>
                    </div>
                    <div className="col-md-3">
                      {/* Display total price for the product */}
                      <p>
                        Total: <FormatPrice price={product?.total} type={currencyType} />
                      </p>
                    </div>
                  </div>
                ))}

                <hr />

                <h4 className="text-primary">
                  Total Amount :
                  <span className="float-end">
                    <FormatPrice price={totalAmount} type={currencyType} />
                  </span>
                </h4>
                <hr />
                <small>* Items will be delivered in 3 - 5 days.</small>
                <br />
                <small>* Tax and other charges are included ?</small>
              </div>
            </div>

            <div className="col-md-12">
              <div className="shadow bg-white p-3">
                <h4 className="text-primary">Basic Information</h4>
                <hr />

                <form
                  action=""
                  method="POST"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={formData.fullname}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            fullname: e.target.value,
                          }))
                        }
                        className="form-control"
                        placeholder="Enter Full Name"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Phone Number</label>
                      <input
                        type="number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            phone: e.target.value,
                          }))
                        }
                        className="form-control"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            email: e.target.value,
                          }))
                        }
                        className="form-control"
                        placeholder="Enter Email Address"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Pin-code (Zip-code)</label>
                      <input
                        type="number"
                        value={formData.pincode}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            pincode: e.target.value,
                          }))
                        }
                        className="form-control"
                        placeholder="Enter Pin-code"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>Full Address</label>
                      <textarea
                        value={formData.fullAddress}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            fullAddress: e.target.value,
                          }))
                        }
                        className="form-control"
                        rows="2"
                      ></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>Select Payment Mode: </label>
                      <div className="d-md-flex align-items-start">
                        <div
                          className="nav col-md-3 flex-column nav-pills me-3"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <button
                            className="nav-link fw-bold"
                            id="cashOnDeliveryTab-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#cashOnDeliveryTab"
                            type="button"
                            role="tab"
                            aria-controls="cashOnDeliveryTab"
                            aria-selected="true"
                            onClick={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                paymentMode: "Cash",
                              }))
                            }
                          >
                            Cash on Delivery
                          </button>
                          <button
                            className="nav-link fw-bold"
                            id="onlinePayment-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#onlinePayment"
                            type="button"
                            role="tab"
                            aria-controls="onlinePayment"
                            aria-selected="false"
                            onClick={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                paymentMode: "Online",
                              }))
                            }
                          >
                            Online Payment
                          </button>
                        </div>
                        <div
                          className="tab-content col-md-9"
                          id="v-pills-tabContent"
                        >
                          <div
                            className="tab-pane fade"
                            id="cashOnDeliveryTab"
                            role="tabpanel"
                            aria-labelledby="cashOnDeliveryTab-tab"
                            tabindex="0"
                          >
                            <h6>Cash on Delivery Mode</h6>
                            <hr />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={placeOrder}
                            >
                              Place Order (Cash on Delivery)
                            </button>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="onlinePayment"
                            role="tabpanel"
                            aria-labelledby="onlinePayment-tab"
                            tabindex="0"
                          >
                            <h6>Online Payment Mode</h6>
                            <hr />
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={placeOrder}
                            >
                              Pay Now (Online Payment)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {loading && <ClipLoader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
