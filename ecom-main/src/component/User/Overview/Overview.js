import React from "react";
import "./overview.css";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Overview = () => {
  const { user } = useSelector((state) => state.CurrentUser);
  const { userOrders } = useSelector((state) => state.orders);
  console.log(user)
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <span
              className="iconify"
              data-icon="uil:apps"
              style={{ marginRight: "10px", marginBottom: "4px" }}
            ></span>
            Overview
          </h4>
        </div>
        <div className="welcome-text">
          <h2>Hi! {user?.name} </h2>
        </div>
      </div>
      <div className="col-lg-6 col-md-12 bg-white">
        <div className="pdpt-bg">
          <div className="pdpt-title">
            <h4>My Rewards</h4>
          </div>
          <div className="ddsh-body">
            <h2>Rewards</h2>
            <ul>
              <li>
                <a className="small-reward-dt hover-btn">Won {20}</a>
              </li>
              <li>
                <a className="small-reward-dt hover-btn">Won 40% Off</a>
              </li>
              <li>
                <a className="small-reward-dt hover-btn">Cashback</a>
              </li>
              <li>
                <a className="rewards-link5">+More</a>
              </li>
            </ul>
          </div>
          <NavLink to="#" className="more-link14">
            Rewards and Details
            <span className="iconify" data-icon="uil:angle-double-right"></span>
          </NavLink>
        </div>
      </div>
      <div className="col-lg-6 col-md-12 bg-white">
        <div className="pdpt-bg">
          <div className="pdpt-title">
            <h4>My Orders</h4>
          </div>
          <div className="ddsh-body">
            <h2> {userOrders?.length} Recently Purchases</h2>
          </div>
          <NavLink to="/user/dashboard/my-orders" className="more-link14">
            All Orders
            <span className="iconify" data-icon="uil:angle-double-right"></span>
          </NavLink>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 bg-white">
        <div className="pdpt-bg">
          <div className="pdpt-title">
            <h4>My Wallet</h4>
          </div>
          <div className="wllt-body">
            <h2>Credits $100</h2>
            <ul className="wallet-list">
              <li>
                <Link to="#" className="wallet-links14">
                  <span className="iconify" data-icon="uil:card-atm"></span>
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link to="#" className="wallet-links14">
                  <span className="iconify" data-icon="uil:gift"></span>3 offers
                  Active
                </Link>
              </li>
              <li>
                <Link to="#" className="wallet-links14">
                  <span className="iconify" data-icon="uil:coins"></span>Points
                  Earning
                </Link>
              </li>
            </ul>
          </div>
          <Link to="#" className="more-link14">
            Rewards and Details
            <span className="iconify" data-icon="uil:angle-double-right"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
