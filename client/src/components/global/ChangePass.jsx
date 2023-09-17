import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { changePass } from "../../redux/actions/authAction";

const ChangePass = ({ setModal, token }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const [hideCurrentPass, setCurrentHidePass] = useState(true);

  // Hàm xử lý sự thay đổi giá trị của current password input
  const handleCurrentPasswordChange = (e) => {
    const value = e.target.value;
    setCurrentPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePass({ currentPassword, newPassword }, token));
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <form
        className="bg-white p-4 rounded-lg shadow-lg w-[500px]"
        onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold mb-4 text-center">Change Password</div>

        <div className="mb-2 relative">
          <label htmlFor="currentPassword" className="font-semibold block mb-1">
            Current Password
          </label>
          <input
            type={hideCurrentPass ? "password" : "text"}
            id="currentPassword"
            name="currentPassword"
            placeholder="Enter your current password"
            className="p-2 w-full h-10 rounded outline-none shadow-md focus:border-b-2 focus:border-blue-500 hover:outline-solid hover:outline-lightgray"
            onChange={(e) => handleCurrentPasswordChange(e)}
          />
          <div
            className="absolute"
            style={{ top: "75%", transform: "translateY(-50%)", right: "10px" }}>
            {hideCurrentPass ? (
              <AiOutlineEyeInvisible onClick={() => setCurrentHidePass(!hideCurrentPass)} />
            ) : (
              <AiOutlineEye onClick={() => setCurrentHidePass(!hideCurrentPass)} />
            )}
          </div>
        </div>

        <div className="mb-2 relative">
          <label htmlFor="newPassword" className="font-semibold block mb-1">
            New Password
          </label>
          <input
            type={hidePass ? "password" : "text"}
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            className="p-2 w-full h-10 rounded outline-none shadow-md focus:border-b-2 focus:border-blue-500 hover:outline-solid hover:outline-lightgray"
            onChange={(e) => handleNewPasswordChange(e)}
          />
          <div
            className="absolute"
            style={{ top: "75%", transform: "translateY(-50%)", right: "10px" }}>
            {hidePass ? (
              <AiOutlineEyeInvisible onClick={() => setHidePass(!hidePass)} />
            ) : (
              <AiOutlineEye onClick={() => setHidePass(!hidePass)} />
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={() => setModal(false)}>
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePass;
