import React from "react";

import LoginPass from "../components/auth/LoginPass.jsx";
import Header from "../components/global/Header.jsx";

const Login = () => {
  return (
    <div>
      <Header content="Login" />
      <div className="w-[50%] m-auto">
        <LoginPass />
      </div>
    </div>
  );
};

export default Login;
