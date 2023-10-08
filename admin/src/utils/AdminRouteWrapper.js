// AdminRouteWrapper.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AdminRouteWrapper = ({ children }) => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token, history]);



  return <>{children}</>;
};

export default AdminRouteWrapper;
