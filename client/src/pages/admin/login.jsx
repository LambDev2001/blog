import React from "react";

import LoginPass from "../../components/admin/auth/LoginPass.jsx";
import Header from "../../components/global/Header.jsx";
import Menu from "../../components/admin/Menu.jsx";

const Login = () => {
  return (
    <div className="d-flex">
      <Menu />
      <div className="w-100">
        <div className="mx-2">
          <Header content="Login" />
          <div className="w-[50%] m-auto">
            <LoginPass />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
