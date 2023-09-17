import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { loginAdmin } from "../../../redux/actions/authAction";
import { Text } from "../form/Input";
import Password from "../../global/form/Password";
import { useHistory } from "react-router-dom";

const LoginPass = () => {
  const [infoUser, setInfoUser] = useState({
    account: "",
    password: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoUser({ ...infoUser, [name]: value }); // update new name: account or password = value
  };
  console.log(infoUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(infoUser).forEach((key) => {
      if (infoUser[key] === "") {
        delete infoUser[key];
      }
    });

    dispatch(loginAdmin(infoUser));
    history.goBack();
  };

  return (
    <form className="bg-white rounded-lg shadow-lg p-2 max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <div className="text-2xl font-semibold mb-4 text-center">Login Form</div>
        <Text name="account" handleText={handleChangeInput} />
        <Password name="password" handlePassword={handleChangeInput} />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full mt-3">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginPass;
