import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { changePass } from "../../redux/actions/authAction";
import Password from "./form/Password";

const ChangePass = ({ setModal, token }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePass({ currentPassword, newPassword }, token));
  };

  const handleCurrentPassword = (e) => {
    const value = e.target.value;
    setCurrentPassword(value);
  };

  const handleNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <form
        className="bg-white p-4 rounded-lg shadow-lg w-[500px]"
        onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold mb-4 text-center">Change Password</div>

        <Password name="currentPassword" handlePassword={handleCurrentPassword} />
        <Password name="newPassword" handlePassword={handleNewPassword} />

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
