import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Text from "../global/form/Text";
import Password from "../global/form/Password";
import { login, register } from "../../redux/actions/authAction";
import validate from "../../utils/validate";

const ModalLogin = ({ handleModalLogin }) => {
  const [infoUser, setInfoUser] = useState({
    account: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    account: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoUser({ ...infoUser, [name]: value });
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let temptErr = {};
    for (const [name, value] of Object.entries(infoUser)) {
      const error = validate(name, value);
      temptErr = { ...temptErr, [name]: error };
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }

    if (!isRegister && errors.account === "" && errors.password === "") {
      dispatch(login(infoUser));
      handleModalLogin(false);
    }
    if (isRegister && Object.values(temptErr).every((error) => error === "")) {
      dispatch(register(infoUser));
      handleModalLogin(false);
    }
  };

  const handleRegister = () => {
    setErrors({
      account: "",
      password: "",
      username: "",
      confirmPassword: "",
    });
    setIsRegister(!isRegister);
  };

  console.log(errors);

  return (
    <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center z-[99999]">
      {!isRegister && (
        <form className="bg-white w-96 p-6 rounded-lg shadow-md" onSubmit={(e) => handleSubmit(e)}>
          <p className="text-3xl font-semibold mb-4 text-black">Login</p>

          <Text name="account" onChange={handleChangeInput} errors={errors} />

          <Password name="password" onChange={handleChangeInput} errors={errors} />

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

          <Text name="username" onChange={handleChangeInput} errors={errors} />
          <Text name="account" onChange={handleChangeInput} errors={errors} />
          <Password name="password" onChange={handleChangeInput} errors={errors} />
          <Password name="confirmPassword" onChange={handleChangeInput} errors={errors} />

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