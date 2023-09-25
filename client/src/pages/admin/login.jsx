import React from "react";

import LoginPass from "../../components/admin/auth/LoginPass.jsx";
import Header from "../../components/global/Header.jsx";

const Login = () => {
  return (
    <div className="mx-2">
      <Header />
      <div className="w-[50%] m-auto">
        <LoginPass />
      </div>
    </div>
  );
};

export default Login;
