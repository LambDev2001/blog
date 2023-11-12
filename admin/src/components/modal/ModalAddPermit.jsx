import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createPermit } from "../../redux/actions/userAction";
import validate from "../../utils/validate";

const ModalAddPermit = ({ token, handleAddModal, handleAddNewPermit }) => {
  const [infoUser, setInfoUser] = useState({
    username: "permit",
    account: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handlePassword = (e) => {
    const { name, value } = e.target;
    let error = validate(name, value);

    setErrors({ ...errors, [name]: error });
    setInfoUser({ ...infoUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let temptErr = {};
    for (const [name, value] of Object.entries(infoUser)) {
      let error = validate(name, value);
      temptErr = { ...temptErr, [name]: error };
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }

    if (Object.values(temptErr).every((error) => error === "")) {
      const newPermit = await dispatch(createPermit(infoUser, token));
      if (!!newPermit) {
        handleAddNewPermit(newPermit);
        handleAddModal(false);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 shadow-lg`}
      style={{ backgroundColor: "rgba(179, 193, 159, 0.29)" }}>
      <form
        className={` p-4 rounded-lg shadow-lg w-[500px] bg-white text-black `}
        onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold">Add New Permit</div>

        <div
          className={` flex flex-col justify-center my-2 p-2 rounded-lg shadow-md overflow-hidden`}>
          <div className="flex flex-col my-2 w-100">
            <label htmlFor="username" className="font-semibold text-xl mb-1">
              Username
            </label>
            <input
              className={` px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={infoUser.username}
              name="username"
              onChange={(e) => handlePassword(e)}
              placeholder="Enter your username..."
            />
            <div className="text-red-500 text-md">{errors.currentPassword}</div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="account" className="font-semibold text-xl mb-1">
              Account
            </label>
            <input
              className={` px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={infoUser.account}
              name="account"
              onChange={(e) => handlePassword(e)}
              placeholder="Enter your account..."
            />
            <div className="text-red-500 text-md">{errors.account}</div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="password" className="font-semibold text-xl mb-1">
              Password
            </label>
            <input
              className={` px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={infoUser.password}
              name="password"
              onChange={(e) => handlePassword(e)}
              placeholder="Enter your password..."
            />
            <div className="text-red-500 text-md">{errors.password}</div>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-end">
          <button
            className="mx-2 py-2 px-3 bg-red-500 hover:bg-red-600 rounded-lg text-white"
            onClick={handleAddModal}>
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

export default ModalAddPermit;
