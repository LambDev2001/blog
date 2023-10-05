import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { updateUser } from "../../../redux/actions/userAction";

const ModalEditProfile = ({ user, handleShowModal }) => {
  const [infoUser, setInfoUser] = useState(user);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleInfoUser = (e) => {
    const { name, value } = e.target;
    setInfoUser({ ...infoUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({...infoUser, birthday: startDate}, token));
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <form className={`${themeColor.main} p-4 rounded-lg shadow-lg w-[500px]`} onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold">Edit Information</div>

        <div className="flex flex-col justify-center my-2 p-2 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col my-2 w-100">
            <label htmlFor="username" className="font-semibold text-white text-xl mb-1">
              Username
            </label>
            <input
              className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={infoUser.username}
              name="username"
              onChange={(e) => handleInfoUser(e)}
            />
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="username" className="font-semibold text-white text-xl mb-1">
              Date of Birth
            </label>

            <DatePicker
              className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none`}
              selected={startDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="numberPhone" className="font-semibold text-white text-xl mb-1">
              Phone number
            </label>
            <input
              className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={infoUser.numberPhone}
              name="numberPhone"
              onChange={(e) => handleInfoUser(e)}
            />
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

export default ModalEditProfile;
