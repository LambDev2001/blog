import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Text from "../../global/form/Text";
import Password from "../../global/form/Password";
import { login, register } from "../../../redux/actions/authAction";

const ModalLogin = ({ handleModalLogin }) => {
  const [infoUser, setInfoUser] = useState({
    account: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoUser({ ...infoUser, [name]: value }); // update new name: account or password = value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRegister) {
      dispatch(login(infoUser));
    } else {
      dispatch(register(infoUser));
    }
    handleModalLogin(false);
  };

  const handleRegister = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center z-[99999]">
      {!isRegister && (
        <form className="bg-white w-96 p-6 rounded-lg shadow-md" onSubmit={(e) => handleSubmit(e)}>
          <p className="text-3xl font-semibold mb-4 text-black">Login</p>

          <Text name="account" onChange={handleChangeInput} />
          <Password name="password" onChange={handleChangeInput} />

          <div
            className="text-md text-blue-500 underline cursor-pointer my-2"
            onClick={handleRegister}>
            Don't have an account? Register here
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mx-2"
              onClick={() => handleModalLogin(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Login
            </button>
          </div>
        </form>
      )}

      {isRegister && (
        <form className="bg-white w-96 p-6 rounded-lg shadow-md" onSubmit={(e) => handleSubmit(e)}>
          <p className="text-3xl font-semibold mb-4 text-black">Register</p>

          <Text name="username" onChange={handleChangeInput} />
          <Text name="account" onChange={handleChangeInput} />
          <Password name="password" onChange={handleChangeInput} />
          <Password name="ConfirmPassword" onChange={handleChangeInput} />

          <div
            className="text-md text-blue-500 underline cursor-pointer my-2"
            onClick={handleRegister}>
            You already have an account? Login here.
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mx-2"
              onClick={() => handleModalLogin(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModalLogin;
