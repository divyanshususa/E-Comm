import React from "react";
// import { currency } from "./your-currency-util"; // Import your currency utility function
import "./myreward.css"; // Import your component-specific CSS if any
import { useDispatch, useSelector } from "react-redux";
import RewardCard from "../../RewardCard";
const MyRewards = () => {
  const { user } = useSelector((state) => state.CurrentUser);

  const cashbacks = [
    {
      id: 1,
      amount: 50,
      date: "2020-05-12",
    },
    {
      id: 2,
      amount: 75,
      date: "2020-05-03",
    },
    // Add more dummy cashback objects as needed
  ];
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {/* <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <span
              className="iconify"
              data-icon="uil:gift"
              style={{ marginRight: "10px", marginBottom: "4px" }}
            ></span>
            My Rewards
          </h4>
        </div>
      </div> */}
      <RewardCard />
      <RewardCard />
      <RewardCard />
      <RewardCard />
      <RewardCard />
      <RewardCard />
      <RewardCard />
      <RewardCard />
      {/* <div className="col-lg-12 col-md-12 bg-white">
        <div className="pdpt-bg">
          <ul className="reward-body-all">
            <li>
              <div className="total-rewards">
                <div className="tt-icon">
                  <span
                    className="iconify"
                    data-icon="uil:money-withdraw"
                  ></span>
                </div>
                <span>Cashbacks</span>
                <h4>
                  {cashbacks
                    .reduce((total, cashback) => total + cashback.amount, 0)
                    .toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                </h4>
              </div>
            </li>
            <li>
              <div className="total-rewards">
                <div className="tt-icon">
                  <span
                    className="iconify mt-2"
                    data-icon="uil:percentage"
                  ></span>
                </div>
                <span>Offers</span>
                <h4>
                  {(0).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </h4>
              </div>
            </li>
            <li>
              <div className="total-rewards">
                <div className="tt-icon">
                  <span className="iconify" data-icon="uil:tag-alt"></span>
                </div>
                <span>Coupons</span>
                <h4 style={{ color: "#f55d2c" }}>
                  {user?.coupon?.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
      {/* <div className="col-lg-4 col-md-12 bg-white">
        <div className="pdpt-bg">
          <div className="reward-body-dtt">
            <div className="reward-img-icon">
              <img
                src="https://www.pngitem.com/pimgs/m/283-2839381_rewards-png-free-download-reward-image-png-transparent.png"
                alt=""
              />
            </div>
            <span className="rewrd-title">Cashback Won</span>
            <h4 className="cashbk-price">
              {(50).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </h4>

            <span className="date-reward">12 May 2020</span>
          </div>
        </div>
      </div> */}
      {/* ... Other reward items ... */}
    </div>
  );
};

export default MyRewards;
