import React from "react";

import AddProduct from "./Products/AddProduct";
import AllProducts from "./Products/AllProducts";
import OrdersInvoice from "./Order/OrdersInvoice";
import OrderList from "./Order/OrderList";
import Dashboard from "./Dashboard";

function VendorHome({ selectedTab }) {
  const renderSelectedComponent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <Dashboard />;
      case "addProduct":
        return <AddProduct />;
      case "allProducts":
        return <AllProducts />;
      case "ordersInvoice":
        return <OrdersInvoice />;
      case "orderList":
        return <OrderList />;

      //   case 'addCategory':
      //     return <AddCategory />;
      //   case 'allCategories':
      //     return <AllCategories />;
      //   case 'customers':
      //     return <Customers />;
      //   case 'sellers':
      //     return <Sellers />;
      //   case 'addOffers':
      //     return <AddOffers />;
      //   case 'offers':
      //     return <OffersList />;
      default:
        return null;
    }
  };

  return (
    <main className="main-container">
      <div>
        {console.log(selectedTab)}
        {renderSelectedComponent()}
      </div>
    </main>
  );
}

export default VendorHome;
