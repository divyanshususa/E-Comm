import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar, setSelectedTab }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          {/* <BsCart3 className='icon_header' /> SHOP */}
          Admin Panel
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedTab("dashboard")}
        >
          <span>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </span>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedTab("allProducts")}
        >
          <span>
            <BsFillArchiveFill className="icon" /> Products
          </span>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedTab("allCategories")}
        >
          <span>
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </span>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedTab("customers")}
        >
          <span>
            <BsPeopleFill className="icon" /> Customers
          </span>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedTab("sellers")}
        >
          <span>
            <BsPeopleFill className="icon" /> Vendors
          </span>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedTab("orderList")}
        >
          <span>
            <BsMenuButtonWideFill className="icon" /> Orders
          </span>
        </li>
        {/* Uncomment the following lines as needed */}
        {/* <li className='sidebar-list-item'>
          <a href="#" onClick={() => setSelectedTab('inventory')}>
            <BsListCheck className='icon' /> Inventory
          </a>
        </li> */}
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedTab("offers")}
        >
          <span>
            <BsMenuButtonWideFill className="icon" /> Offers
          </span>
        </li>
        {/* <li className='sidebar-list-item'>
          <a href="#" onClick={() => setSelectedTab('settings')}>
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
