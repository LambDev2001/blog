import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

import { changePassword } from "../../redux/actions/userAction";
import validate from "../../utils/validate";

const ModalChangePassword = ({ token, handleShowModal }) => {
  const [infoUser, setInfoUser] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const themeColor = useSelector((state) => state.themeUserReducer);

  const dispatch = useDispatch();

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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <form
        className={`${themeColor.main} p-4 rounded-lg shadow-lg w-[500px]`}
        onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold">Change Password</div>

        <div className="flex flex-col justify-center my-2 p-2 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col my-2 w-100">
            <label htmlFor="username" className="font-semibold text-white text-xl mb-1">
              Current Password
            </label>
            <input
              className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={infoUser.currentPassword}
              name="currentPassword"
              onChange={(e) => handlePassword(e)}
              placeholder="Enter your current password..."
            />
            <div className="text-red-500 text-md">{errors.currentPassword}</div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="username" className="font-semibold text-white text-xl mb-1">
              New Password
            </label>
            <input
              className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={infoUser.newPassword}
              name="newPassword"
              onChange={(e) => handlePassword(e)}
              placeholder="Enter your new password..."
            />
            <div className="text-red-500 text-md">{errors.newPassword}</div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="username" className="font-semibold text-white text-xl mb-1">
              Confirm New Password
            </label>
            <input
              className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={infoUser.confirmPassword}
              name="confirmPassword"
              onChange={(e) => handlePassword(e)}
              placeholder="Confirm your new password..."
            />
            <div className="text-red-500 text-md">{errors.confirmPassword}</div>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-end">
          <button
            className="mx-2 py-2 px-3 text-white bg-red-500 hover:bg-red-600 rounded-lg"
            onClick={() => handleShowModal()}>
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 py-2 px-3 text-white bg-green-500 hover:bg-green-600 rounded-lg">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalChangePassword;
