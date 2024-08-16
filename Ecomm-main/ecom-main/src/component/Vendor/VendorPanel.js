import React, { useState } from "react";
import "../../App.css";

import VendorHeader from "./VendorHeader";
import VendorSidebar from "./VendorSidebar";
import VendorHome from "./VendorHome";

const VendorPanel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <VendorHeader OpenSidebar={OpenSidebar} />
      <VendorSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setSelectedTab={setSelectedTab}
      />
      <VendorHome selectedTab={selectedTab} />
    </div>
  );
};

export default VendorPanel;
