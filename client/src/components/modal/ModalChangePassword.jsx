import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { changePassword } from "../../redux/actions/userAction";
import validate from "../../utils/validate";

const ModalChangePassword = ({ token, handleShowModal }) => {
  const [infoUser, setInfoUser] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [hidePass, setHidePass] = useState({
    currentPassword: true,
    newPassword: true,
    confirmPassword: true,
  });

  const [errors, setErrors] = useState({});
  const themeColor = useSelector((state) => state.themeUserReducer);

  const dispatch = useDispatch();

  const renderPass = ({ type = "text", key }) => (
    <div className="relative">
      <input
        className={`${themeColor.input} w-100 px-3 py-2 rounded-md focus:outline-none`}
        type={hidePass[key] ? "password" : "text"}
        value={infoUser[key]}
        name={key}
        onChange={(e) => handlePassword(e)}
        placeholder={`Enter your ${key}...`}
      />
      {renderEye(key)}
    </div>
  );

  const renderEye = (key) => {
    if (hidePass[key] === true)
      return (
        <IoEyeOff
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          size={20}
          onClick={() => handleHidePass(key)}
        />
      );
    else
      return (
        <IoEye
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          size={20}
          onClick={() => handleHidePass(key)}
        />
      );
  };

  const handleHidePass = (key) => {
    setHidePass((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    let error = {};
    if (name === "confirmPassword") {
      error = validate(name, value, infoUser.newPassword);
    } else {
      error = validate(name, value);
    }
    setErrors({ ...errors, [name]: error });
    setInfoUser({ ...infoUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let temptErr = {};
    for (const [name, value] of Object.entries(infoUser)) {
      let error = {};
      if (name === "confirmPassword") {
        error = validate(name, value, infoUser.newPassword);
      } else {
        error = validate(name, value);
      }
      temptErr = { ...temptErr, [name]: error };
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }

    if (Object.values(temptErr).every((error) => error === "")) {
      dispatch(changePassword(infoUser, token));
    }
  };

  return (
    <div
      className={`${themeColor.text} fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 shadow-lg`}
      style={{ backgroundColor: "rgba(179, 193, 159, 0.29)" }}>
      <form
        className={`${themeColor.main} p-4 rounded-lg shadow-lg w-[500px]`}
        onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold">Change Password</div>

        <div
          className={`${themeColor.sub} flex flex-col justify-center my-2 p-2 rounded-lg shadow-md overflow-hidden`}>
          <div className="flex flex-col my-2 w-100">
            <label htmlFor="username" className="font-semibold text-xl mb-1">
              Current Password
            </label>
            {renderPass({ key: "currentPassword" })}
            <div className="text-red-500 text-md">{errors.currentPassword}</div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="newPassword" className="font-semibold text-xl mb-1">
              New Password
            </label>
            {renderPass({ key: "newPassword" })}
            <div className="text-red-500 text-md">{errors.newPassword}</div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="confirmPassword" className="font-semibold text-xl mb-1">
              Confirm New Password
            </label>
            {renderPass({ key: "confirmPassword" })}
            <div className="text-red-500 text-md">{errors.confirmPassword}</div>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-end">
          <button
            className="mx-2 py-2 px-3 bg-red-500 hover:bg-red-600 rounded-lg text-white"
            onClick={() => handleShowModal()}>
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 py-2 px-3 bg-green-500 hover:bg-green-600 rounded-lg text-white">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalChangePassword;
