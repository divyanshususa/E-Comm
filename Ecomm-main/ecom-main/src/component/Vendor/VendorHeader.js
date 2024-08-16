import React, { useState } from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";
// import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function VendorHeader({ OpenSidebar }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Clear local storage or perform any other logout actions
    localStorage.clear();
    navigate("/AdminVendorLogin");
    // Redirect or perform any other actions after logout if needed
    // window.location.href = "/login"; // Redirect to login page
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <div className="d-flex align-items-center">
          <BsPersonCircle className="icon" onClick={toggleDropdown} />
          <div className="dropdown-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </header>
  );
}

export default VendorHeader;
