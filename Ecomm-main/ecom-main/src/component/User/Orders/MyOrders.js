import React, { useEffect } from "react";
import "./myorders.css";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../OrderCard";

const MyOrders = () => {
  const { userOrders } = useSelector((state) => state.orders);

  return (
    // <div className="row">
    //   <div className="col-md-12">
    //     <div className="main-title-tab">
    //       <h4>
    //         <span
    //           className="iconify"
    //           data-icon="uil:box"
    //           style={{ marginRight: "10px", marginBottom: "4px" }}
    //         ></span>
    //         My Orders
    //       </h4>
    //     </div>
    //   </div>
    //   <div className="col-lg-12 col-md-12 bg-white mt-3">
    //     {userOrders?.map((order) => (
    //       <div key={order.id} className="pdpt-bg">
    //         <div className="pdpt-title">
    //           <h6>
    //             Order is Placed on {new Date(order.odate).toLocaleDateString()}
    //           </h6>
    //         </div>
    //         <div className="order-body10">
    //           <ul className="order-dtsll">
    //             <li>
    //               <div className="order-dt-img">
    //                 <img src="/assets/images/groceries.svg" alt="" />
    //               </div>
    //             </li>
    //             <li>
    //               <div className="order-dt47">
    //                 <h4>
    //                   {order.oproduct} - {order.oaddress}
    //                 </h4>
    //                 <p>Status - {order.ostatus}</p>
    //                 <div className="order-title">
    //                   {order.ocart.length} Items
    //                   <span
    //                     matTooltip="Hello"
    //                     matTooltipPosition="above"
    //                     matTooltipClass="tooltip"
    //                   >
    //                     ?
    //                   </span>
    //                 </div>
    //               </div>
    //             </li>
    //           </ul>
    //           <div className="total-dt">
    //             <div className="total-checkout-group">
    //               <div className="cart-total-dil">
    //                 <h4>Sub Total</h4>
    //                 <span>{(order.oprice * 100) / 107}</span>
    //               </div>
    //               <div className="cart-total-dil pt-3">
    //                 <h4>Delivery Charges</h4>
    //                 <span>{(((order.oprice * 100) / 107) * 7) / 100}</span>
    //               </div>
    //             </div>
    //             <div
    //               className="cart-total-dil d-flex mt-5"
    //               style={{ gap: "2rem" }}
    //             >
    //               <h5>Total</h5>
    //               <span>{order.oprice}</span>
    //             </div>
    //           </div>
    //           <div className="track-order">
    //             {/* <h4>Track Order</h4> */}
    //             <div className="bs-wizard" style={{ borderBottom: "0" }}>
    //               {/* Add your logic for bs-wizard-step and bs-wizard-dot here */}
    //             </div>
    //           </div>
    //           <div className="alert-offer">
    //             <img src="assets/images/ribbon.svg" alt="" />
    //             Cashback of {(3 * order.oprice) / 100} will be credited to your
    //             wallet 6-12 hours of delivery.
    //           </div>
    //           <div className="call-bill">
    //             <div className="delivery-man">
    //               Delivery Boy -{" "}
    //               <a href="#">
    //                 <span
    //                   className="iconify"
    //                   data-icon="uil:phone"
    //                   style={{ marginBottom: "4px" }}
    //                 ></span>
    //                 Call Us
    //               </a>
    //             </div>
    //             <div className="order-bill-slip">
    //               {/* <a href="#" className="bill-btn5 hover-btn">View Bill</a> */}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="">
      <OrderCard />
    </div>
  );
};

export default MyOrders;
