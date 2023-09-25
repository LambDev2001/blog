import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePass } from "../../redux/actions/authAction";
import Password from "./form/Password";
import Button from "./theme/button/Button";

const ChangePass = ({ setModal, token }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const color = useSelector((state) => state.themeReducer.themeColor);
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
        className={`${color.inside} p-4 rounded-lg shadow-lg w-[500px]`}
        onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold mb-4 text-center">Change Password</div>

        <Password name="currentPassword" handlePassword={handleCurrentPassword} />
        <Password name="newPassword" handlePassword={handleNewPassword} />

        <div className="flex justify-center mt-4">
          <Button text={"Close"} color={0} onClick={() => setModal(false)} />
          <Button text={"Submit"} color={2} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ChangePass;
