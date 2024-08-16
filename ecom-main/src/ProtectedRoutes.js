import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const login = localStorage.getItem("login");
    // const isAdmin = localStorage.getItem("isAdmin");
    // const isVendor=localStorage.getItem("isVendor")
    // console.log("inside ...add",isAdmin);
    // console.log("inside ...ven",isVendor);
    if (login !== "true") navigate("/AdminVendorLogin");
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoutes;
