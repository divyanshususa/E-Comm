// import React, { useEffect, useState } from "react";
// import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
// import { Column } from "@ant-design/plots";
// import { Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getMonthlyData,
//   getOrders,
//   getYearlyData,
// } from "../../../features/revenueSlice";

// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Product Count",
//     dataIndex: "product",
//   },
//   {
//     title: "Total Price",
//     dataIndex: "price",
//   },
//   {
//     title: "Total Price After Discount",
//     dataIndex: "dprice",
//   },
//   {
//     title: "Status",
//     dataIndex: "staus",
//   },
// ];

// const Dashboard = () => {
//   const dispatch = useDispatch();

//   const monthlyDataState = useSelector((state) => state?.revenue?.monthlyData);
//   const yearlyDataState = useSelector((state) => state?.revenue?.yearlyData);
//   const orderState = useSelector((state) => state?.revenue?.orders?.orders);
//   console.log(orderState);

//   const [dataMonthly, setDataMonthly] = useState([]);
//   const [dataMonthlySales, setDataMonthlySales] = useState([]);
//   const [orderData, setOrderData] = useState([]);

//   const getTokenFromLocalStorage = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null;

//   const config3 = {
//     headers: {
//       Authorization: `Bearer ${
//         getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
//       }`,
//       Accept: "application/json",
//     },
//   };

//   useEffect(() => {
//     dispatch(getMonthlyData());
//     dispatch(getYearlyData());
//     dispatch(getOrders());
//   }, []);

//   useEffect(() => {
//     let monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     let data = [];

//     let monthlyOrderCount = [];
//     for (let index = 0; index < monthlyDataState?.length; index++) {
//       const element = monthlyDataState[index];
//       data.push({
//         type: monthNames[element?.month],
//         income: element?.totalRevenue,
//       });
//       monthlyOrderCount.push({
//         type: monthNames[element?.month],
//         income: element?.orderCount,
//       });
//     }

//     setDataMonthly(data);
//     setDataMonthlySales(monthlyOrderCount);

//     const data1 = [];

//     for (let i = 0; i < orderState?.length; i++) {
//       data1.push({
//         key: i,
//         // name: orderState[i].user.firstname + " " + orderState[i].user.lastname,
//         product: orderState[i].ocart?.length,
//         price: orderState[i]?.oprice,
//         dprice: orderState[i]?.oprice,
//         staus: orderState[i]?.ostatus,
//       });
//     }
//     setOrderData(data1);
//   }, [monthlyDataState, yearlyDataState]);

//   const config = {
//     data: dataMonthly,
//     xField: "type",
//     yField: "income",
//     color: ({ type }) => {
//       return "#ffd333";
//     },
//     label: {
//       position: "middle",
//       style: {
//         fill: "#FFFFFF",
//         opacity: 1,
//       },
//     },
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },
//     meta: {
//       type: {
//         alias: "Month",
//       },
//       sales: {
//         alias: "Income",
//       },
//     },
//   };

//   const config2 = {
//     data: dataMonthlySales,
//     xField: "type",
//     yField: "income",
//     color: ({ type }) => {
//       return "#ffd333";
//     },
//     label: {
//       position: "middle",
//       style: {
//         fill: "#FFFFFF",
//         opacity: 1,
//       },
//     },
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },
//     meta: {
//       type: {
//         alias: "Month",
//       },
//       sales: {
//         alias: "Income",
//       },
//     },
//   };

//   return (
//     <div>
//       <h3 className="mb-4 title">Dashboard</h3>
//       <div className="d-flex justify-content-between align-items-center gap-3">
//         <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
//           <div>
//             <p className="desc">Total Income</p>
//             <h4 className="mb-0 sub-title">
//               Rs.{yearlyDataState && yearlyDataState[0]?.totalRevenue}
//             </h4>
//           </div>
//           <div className="d-flex flex-column align-items-end">
//             <p className="mb-0  desc">Income in Last Year from Today</p>
//           </div>
//         </div>
//         <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
//           <div>
//             <p className="desc">Total Sales</p>
//             <h4 className="mb-0 sub-title">
//               {yearlyDataState && yearlyDataState[0]?.orderCount}
//             </h4>
//           </div>
//           <div className="d-flex flex-column align-items-end">
//             <p className="mb-0  desc">Sales in Last Year from Today</p>
//           </div>
//         </div>
//       </div>
//       <div className="d-flex justify-content-between align-items gap-3">
//         <div className="mt-4 flex-grow-1 w-50">
//           <h3 className="mb-5 title">Income in Last Year from Today</h3>
//           <div>
//             <Column {...config} />
//           </div>
//         </div>
//         <div className="mt-4 flex-grow-1 ">
//           <h3 className="mb-5 title">Sales in Last Year from Today </h3>
//           <div>
//             <Column {...config2} />
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-5 title">Recent Orders</h3>
//         <div>
//           <Table columns={columns} dataSource={orderData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
