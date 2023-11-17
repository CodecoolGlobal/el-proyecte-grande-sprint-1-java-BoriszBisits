import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


function SuccessPage() {
    const location = useLocation();
    const message = location.state?.message || "Default success message";
  
  return (
    <div>
      <p>{message}</p>
      <Link to="/">Login</Link>
    </div>
  );
}

export default SuccessPage;
