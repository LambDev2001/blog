import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Text from "../global/form/Text";
import Password from "../global/form/Password";
import { login, register, forgotPassword } from "../../redux/actions/authAction";
import validate from "../../utils/validate";
import ModalPolicy from "./ModalPolicy";

const ModalLogin = ({ handleModalLogin, typeModal, setTypeModal }) => {
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
  const [openPolicy, setOpenPolicy] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
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

    if (typeModal === "login" && errors.account === "" && errors.password === "") {
      dispatch(login(infoUser));
      handleModalLogin(false);
    }
    if (
      typeModal === "register" &&
      acceptPolicy &&
      Object.values(temptErr).every((error) => error === "")
    ) {
      dispatch(register(infoUser));
      handleModalLogin(false);
    }

    if (typeModal === "forget") {
      dispatch(forgotPassword(infoUser));
      handleChangeTypeModal("login");
    }
  };

  const handleChangeTypeModal = (type) => {
    setErrors({
      account: "",
      password: "",
      username: "",
      confirmPassword: "",
    });
    setTypeModal(type);
  };

  const handleOpenPolicy = () => {
    setOpenPolicy(!openPolicy);
  };

  return (
    <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center z-[99999]">
      {typeModal === "login" && (
        <form className="bg-white w-96 p-6 rounded-lg shadow-md" onSubmit={(e) => handleSubmit(e)}>
          <p className="text-3xl font-semibold mb-4 text-black">Login</p>

          <Text name="account" onChange={handleChangeInput} errors={errors} />

          <Password name="password" onChange={handleChangeInput} errors={errors} />

          <div
            className="text-md text-blue-500 underline cursor-pointer my-2"
            onClick={() => handleChangeTypeModal("register")}>
            Don't have an account? Register here
          </div>
          <div
            className="text-md text-blue-500 underline cursor-pointer my-2"
            onClick={() => handleChangeTypeModal("forget")}>
            Forget password? Click here.
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

      {typeModal === "register" && (
        <form className="bg-white w-96 p-6 rounded-lg shadow-md" onSubmit={(e) => handleSubmit(e)}>
          <p className="text-3xl font-semibold mb-4 text-black">Register</p>

          <Text name="username" onChange={handleChangeInput} errors={errors} />
          <Text name="account" onChange={handleChangeInput} errors={errors} />
          <Password name="password" onChange={handleChangeInput} errors={errors} />
          <Password name="confirmPassword" onChange={handleChangeInput} errors={errors} />

          <div
            className="text-md text-blue-500 underline cursor-pointer my-2"
            onClick={() => handleChangeTypeModal("login")}>
            You already have an account? Login here.
          </div>

          <div className="flex">
            <input
              type="checkbox"
              checked={acceptPolicy}
              onChange={() => setAcceptPolicy(!acceptPolicy)}
              className="mr-2"
            />
            <div
              className="text-md text-blue-500 underline cursor-pointer my-2"
              onClick={() => handleOpenPolicy()}>
              Accept policy and terms of service here.
            </div>
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

      {typeModal === "forget" && (
        <form className="bg-white w-96 p-6 rounded-lg shadow-md" onSubmit={(e) => handleSubmit(e)}>
          <p className="text-3xl font-semibold mb-4 text-black">Forget password</p>
          <Text name="account" onChange={handleChangeInput} errors={errors} />
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mx-2"
              onClick={() => handleModalLogin(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Send
            </button>
          </div>
        </form>
      )}

      {openPolicy && (
        <ModalPolicy
          handleOpenPolicy={handleOpenPolicy}
          setAcceptPolicy={setAcceptPolicy}
          acceptPolicy={acceptPolicy}
        />
      )}
    </div>
  );
};

export default ModalLogin;
