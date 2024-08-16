import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PDFExport } from "@progress/kendo-react-pdf";




const OrderPlaced = ({ orderdata, qrdata }) => {
  const { carts } = useSelector((state) => state.allCart);
  console.log(carts);

  const [qrcod, setqrcod] = useState();
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString(); // Get only the date part

  // Create an expected date that is 3 days after the current date
  const expectedDate = new Date();
  expectedDate.setDate(currentDate.getDate() + 3);
  const formattedExpectedDate = expectedDate.toLocaleDateString();

  const generateQr = async () => {
    const response = await axios.get(
      `https://swiftmart-416707.el.r.appspot.com/api/qr/qrcode?cid=${qrdata.uid}&oid=${qrdata.oid}&vid=${qrdata.vid}`
    );

    console.log("qrur response ...", response);
    setqrcod(response.data);
  };

  const targetRef = useRef();

  const handlePrint = () => {
    // setIsVisible(false)
    generateQr();
    // generatePDF(targetRef, { filename: "Invoice.pdf" })
    // setIsVisible(true)
    console.log("save");
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.save();
      }
    }, 1000)

  };

  return (
    <div>
      {console.log("placed order details..", qrdata)}

      <div className="wrapper" style={{ backgroundColor: "#f7f7f7" }}>
        <div className="gambo-Breadcrumb">
          <div className="container">
            <div className="row" style={{ paddingTop: "10px" }}>
              <div className="col-md-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Order Placed
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="all-product-grid" style={{ paddingTop: "0px 175px" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="order-placed-dt">
                  <span
                    className="iconify cus-icon icon-circle"
                    data-icon="uil:check-circle"
                    style={{ verticalAlign: "text-bottom" }}
                  ></span>
                  <h2>Order Successfully Placed</h2>
                  <p style={{ fontWeight: "300" }}>
                    Thank you for your order! will receive order -
                    <span>(Between 9:00AM To 10:00PM)</span>
                  </p>
                  <div className="delivery-address-bg">
                    <div className="title585 d-flex align-items-center">
                      <div className="pln-icon">
                        <span
                          className="iconify cus-icon"
                          data-icon="uil:telegram-alt"
                          style={{
                            verticalAlign: "text-bottom",
                            color: "#f55d2c",
                          }}
                        ></span>
                      </div>
                      <h4 style={{ fontWeight: "400" }}>
                        Your order will be sent to this address
                      </h4>
                    </div>
                    <ul className="address-placed-dt1">
                      <li>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <span
                            className="iconify cus-icon"
                            data-icon="uil:map-marker-alt"
                            style={{
                              verticalAlign: "text-bottom",
                              marginRight: "5px",
                            }}
                          ></span>
                          Address : {orderdata?.fullAddress}
                          <span></span>
                        </p>
                      </li>
                      <li>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <span
                            className="iconify cus-icon"
                            data-icon="uil:phone-alt"
                            style={{
                              verticalAlign: "text-bottom",
                              marginRight: "5px",
                            }}
                          ></span>
                          Phone Number :<span>+91-{orderdata?.phone}</span>
                        </p>
                      </li>
                      <li>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <span
                            className="iconify cus-icon"
                            data-icon="uil:envelope"
                            style={{
                              verticalAlign: "text-bottom",
                              marginRight: "5px",
                            }}
                          ></span>
                          Order Date :{" "}
                          <span>
                            {formattedCurrentDate}
                            <div
                              className="__cf_email__"
                              data-cfemail="771d181f1913181237120f161a071b125914181a"
                            ></div>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <span
                            className="iconify cus-icon"
                            data-icon="uil:envelope"
                            style={{
                              verticalAlign: "text-bottom",
                              marginRight: "5px",
                            }}
                          ></span>
                          Expected Delivery Date :
                          <span>
                            {" "}
                            {formattedExpectedDate}{" "}
                            <div
                              className="__cf_email__"
                              data-cfemail="771d181f1913181237120f161a071b125914181a"
                            ></div>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <span
                            className="iconify cus-icon"
                            data-icon="uil:card-atm"
                            style={{
                              verticalAlign: "text-bottom",
                              marginRight: "5px",
                            }}
                          ></span>
                          Payment Method :<span>{orderdata?.paymentMode}</span>
                        </p>
                      </li>
                    </ul>
                    <div className="stay-invoice">
                      <div className="st-hm d-flex align-items-center">
                        Stay Home
                        <span
                          className="iconify cus-icon"
                          data-icon="uil:smile"
                          style={{
                            verticalAlign: "text-bottom",
                            marginRight: "5px",
                          }}
                        ></span>
                      </div>
                      <a href="/" className="invc-link hover-btn">
                        <button className="btn btn-primary">Continue</button>
                      </a>
                      <button
                        className="btn btn-primary "
                        style={{ marginLeft: "1rem" }}
                        onClick={() => generateQr()}
                      >
                        Generate my QRCode
                      </button>

                      <button onClick={handlePrint} className="bg-blue-400 p-1 text-white text-2xl">Generate PDF</button>

                      <div
                        style={{
                          position: "absolute",
                          left: "-1000px",
                          top: 0,
                        }}
                      >
                        <PDFExport paperSize="A4" margin="1cm" ref={targetRef}>
                          <div>
                            <h1 className="text-center text-3xl font-sans text-black">Your Products</h1>
                            <ol>
                              {carts.map((item) => (
                                <div key={item.vid}>
                                  <li>{item.pname}</li>
                                  <li>{item.pdes}</li>
                                  <li>discounted price : {item.dprice}</li>
                                  <li> price : {item.aprice}</li>
                                </div>
                              ))}
                            </ol>

                            <h1 className="text-center text-3xl font-sans text-black">Qr code</h1>

                            <img src={qrcod} alt="Qr code" className="h-40 w-40" />
                          </div>
                        </PDFExport>
                      </div>



                      <div className="placed-bottom-dt">
                        The payment of <span></span> you'll make when the deliver
                        arrives with your order.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
