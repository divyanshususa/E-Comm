import React, { useState, useEffect } from "react";

import "./dashboard.css";
import VendorService from "../../Services/VendorService";

const Dashboard = () => {
  const [ordered, setOrdered] = useState(0);
  const [dispatched, setDispatched] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [currVendor, setCurrVendor] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ven = JSON.parse(localStorage.getItem("vendorDetails"));
        setCurrVendor(ven.employer);
        const response = await VendorService.getRecentOrders(ven.employer._id);
        const data = response.data;
        const orderedCount = data.filter(
          (order) => order.ostatus === "Ordered"
        ).length;
        const dispatchedCount = data.filter(
          (order) => order.ostatus === "Dispatched"
        ).length;
        const deliveredCount = data.filter(
          (order) => order.ostatus === "Delivered"
        ).length;
        const cancelledCount = data.filter(
          (order) => order.ostatus === "Cancelled"
        ).length;

        setOrdered(orderedCount);
        setDispatched(dispatchedCount);
        setDelivered(deliveredCount);
        setCancelled(cancelledCount);
        setRecentOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // Fetch data from the API
    // fetch('https://swiftmart-416707.el.r.appspot.com/api/orders/recent-orders/')
    //   .then(response => response.json())
    //   .then(data => {
    //     // Process the data and update the state
    //     const orderedCount = data.filter(order => order.ostatus === 'Ordered').length;
    //     const dispatchedCount = data.filter(order => order.ostatus === 'Dispatched').length;
    //     const deliveredCount = data.filter(order => order.ostatus === 'Delivered').length;
    //     const cancelledCount = data.filter(order => order.ostatus === 'Cancelled').length;

    //     setOrdered(orderedCount);
    //     setDispatched(dispatchedCount);
    //     setDelivered(deliveredCount);
    //     setCancelled(cancelledCount);
    //     setRecentOrders(data);
    //   })
    //   .catch(error => console.error('Error fetching data:', error));
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div
      className="container-fluid"
      style={{ marginTop: "55px", paddingTop: "5px" }}
    >
      <h2 className="mt-30 page-title">Dashboard</h2>
      {console.log("alhfkahsf", recentOrders)}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="dashboard-report-card purple">
            <div className="card-content">
              <span className="card-title">Ordered</span>
              <span className="card-count"> {ordered} </span>
            </div>
            <div className="card-media">
              <i className="fab fa-rev"></i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="dashboard-report-card info">
            <div className="card-content">
              <span className="card-title">Dispatched</span>
              <span className="card-count">{dispatched}</span>
            </div>
            <div className="card-media">
              <i className="fas fa-sync-alt rpt_icon"></i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="dashboard-report-card success">
            <div className="card-content">
              <span className="card-title">Delivered</span>
              <span className="card-count">{delivered} </span>
            </div>
            <div className="card-media">
              <i className="fas fa-money-bill rpt_icon"></i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="dashboard-report-card red">
            <div className="card-content">
              <span className="card-title">Cancelled</span>
              <span className="card-count">{cancelled}</span>
            </div>
            <div className="card-media">
              <i className="far fa-times-circle"></i>
            </div>
          </div>
        </div>
        {/* <div className="col-xl-12 col-md-12">
          <div className="card card-static-1 mb-30">
            <div className="card-body">
              <div id="chart"></div>
            </div>
          </div>
        </div> */}
        <div className="col-xl-12 col-md-12">
          <div
            className="card card-static-2 mb-30"
            style={{ backgroundColor: "white" }}
          >
            <div className="card-title-2">
              <h4>Recent Orders</h4>
              <a href="/admin/orders" className="view-btn hover-btn">
                View All
              </a>
            </div>
            <div className="card-body-table">
              <div className="table-responsive">
                <table className="table ucp-table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: "180px", paddingLeft: "45px" }}>
                        Order ID
                      </th>
                      <th style={{ width: "200px" }}>Date</th>
                      <th style={{ width: "200px" }}>Address</th>
                      <th style={{ width: "130px" }}>Status</th>
                      <th style={{ width: "130px" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders &&
                      recentOrders.map((order, index) => (
                        <tr key={index}>
                          <td style={{ paddingLeft: "45px" }}>{order.ono}</td>
                          <td>
                            <span className="delivery-time">
                              {new Date(order.odate).toLocaleDateString()}
                            </span>
                            <br />
                            <span className="delivery-time">
                              {new Date(order.odate).toLocaleTimeString()}
                            </span>
                          </td>
                          <td>{order.oaddress && <>{order.oaddress}</>}</td>
                          <td>
                            <span className="badge-item badge-status">
                              {order.ostatus}
                            </span>
                          </td>
                          <td>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(order.oprice)}
                          </td>
                          {/* ... (you can add more columns as needed) */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
