import React from "react";
import "./myaddress.css";
import { LocationOnIcon } from "../../../static/icons";

const MyAddress = ({ openDialog }) => {
  const allAddress = [
    {
      id: 1,
      nickname: "Home",
      name: "John Doe",
      addressline: "123 Main St",
      city: "Cityville",
      pincode: "12345",
      state: "Stateville",
      country: "Countryland",
    },
    {
      id: 2,
      nickname: "Office",
      name: "Jane Doe",
      addressline: "456 Business St",
      city: "Workcity",
      pincode: "54321",
      state: "Workstate",
      country: "Workland",
    },
    {
      id: 3,
      nickname: "Other",
      name: "Other Person",
      addressline: "789 Random St",
      city: "Randomville",
      pincode: "98765",
      state: "Randomstate",
      country: "Randomland",
    },
  ];

  return (
    // <div className="row">
    //   <div className="col-md-12">
    //     <div className="main-title-tab">
    //       <h4>
    //         <span
    //           className="iconify"
    //           data-icon="uil:location-point"
    //           style={{ marginRight: "10px", marginBottom: "4px" }}
    //         ></span>
    //         My Address
    //       </h4>
    //     </div>
    //   </div>
    //   <div className="col-lg-12 col-md-12">
    //     <div className="pdpt-bg">
    //       <div className="pdpt-title">
    //         <h4>My Address</h4>
    //       </div>
    //       <div className="address-body">
    //         <span
    //           onClick={openDialog}
    //           style={{ cursor: "pointer" }}
    //           className="add-address hover-btn"
    //           data-toggle="modal"
    //           data-target="#address_model"
    //         >
    //           Add New Address
    //         </span>
    //         <div className="address-item">
    //           {allAddress.map((address) => (
    //             <div key={address.id} className="address-item">
    //               <div className="address-icon1">
    //                 {address.nickname === "Home" && (
    //                   <span className="iconify" data-icon="uil:home-alt"></span>
    //                 )}
    //                 {address.nickname === "Office" && (
    //                   <span className="iconify" data-icon="uil:bag-alt"></span>
    //                 )}
    //                 {address.nickname === "Other" && (
    //                   <span
    //                     className="iconify"
    //                     data-icon="uil:location-arrow"
    //                   ></span>
    //                 )}
    //               </div>
    //               <div className="address-dt-all">
    //                 <h4>{address.name}</h4>
    //                 <p>
    //                   {`${address.addressline}, ${address.city} - ${address.pincode}, ${address.state}, ${address.country}`}
    //                 </p>
    //                 <ul className="action-btns">
    //                   <li>
    //                     <a className="action-btn">
    //                       <span
    //                         className="iconify"
    //                         data-icon="uil:trash-alt"
    //                       ></span>
    //                     </a>
    //                   </li>
    //                 </ul>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="border-1 border-gray-400 rounded-xl p-4">
      <h1 className="text-2xl text-black font-sans font-semibold">
        Your Addresses :
      </h1>
      <div className="flex flex-col gap-4">
        <div className="rounded border-1 flex p-2 border-gray-400 ">
          <span className="text-gray-300">
            <LocationOnIcon style={{ fontSize: "2rem" }} />
          </span>
          <p className="text-2xl font-sans">
            789, Civil Lines, Delhi, 110001, India
          </p>
        </div>
        <div className="rounded border-1 flex p-2 border-gray-400 ">
          <span className="text-gray-300">
            <LocationOnIcon style={{ fontSize: "2rem" }} />
          </span>
          <p className="text-2xl font-sans">
            789, Civil Lines, Delhi, 110001, India
          </p>
        </div>
        <div className="rounded border-1 flex p-2 border-gray-400 ">
          <span className="text-gray-300">
            <LocationOnIcon style={{ fontSize: "2rem" }} />
          </span>
          <p className="text-2xl font-sans">
            789, Civil Lines, Delhi, 110001, India
          </p>
        </div>
       
      </div>

      <button className="border-2 rounded-lg border-gray-300 text-2xl uppercase bg-gray-200 p-1 text-gray-500 mt-4 hover:bg-slate-300 duration-200">
        + new address
      </button>
    </div>
  );
};

export default MyAddress;
