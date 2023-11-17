import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar3 } from "react-icons/bs";

import { updateUser } from "../../redux/actions/userAction";
import validate from "../../utils/validate";
import { splitLabel } from "../../utils/SplitLabel";

const ModalEditProfile = ({ user, handleShowModal }) => {
  const [infoUser, setInfoUser] = useState(user);
  const [errors, setErrors] = useState({});
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date("1980-01-01"));

  useEffect(() => {
    const originalDate = new Date(user.birthday);
    if (!isNaN(originalDate)) {
      setStartDate(originalDate);
    }
  }, [user]);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleInfoUser = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
    setInfoUser({ ...infoUser, [name]: value });
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
    delete temptErr.password
    console.log(temptErr);

    if (Object.values(temptErr).every((error) => error === "")) {
      dispatch(updateUser({ ...infoUser, birthday: startDate }, token));
      handleShowModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <form
        className={`${themeColor.main} ${themeColor.text} p-4 rounded-lg shadow-lg w-[500px]`}
        onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold">Edit Information</div>

        <div
          className={`${themeColor.sub} flex flex-col justify-center my-2 p-2 rounded-lg shadow-md overflow-hidden`}>
          <div className="flex flex-col my-2 w-100">
            <label htmlFor="username" className="font-semibold  text-xl mb-1">
              Username
            </label>
            <div>
              <input
                className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none shadow-md`}
                type="text"
                value={infoUser.username}
                name="username"
                onChange={(e) => handleInfoUser(e)}
              />
            </div>
            <div className="text-red-500 text-md">{errors.username}</div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="sex" className="font-semibold  text-xl mb-1">
              Sex
            </label>
            <div>
              <select
                name="sex"
                id=""
                className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none shadow-md`}
                onChange={(e) => handleInfoUser(e)}>
                {!!user.sex ? (
                  <option value={user.sex}>{splitLabel(user.sex)}</option>
                ) : (
                  <option value={""}>Choose sex</option>
                )}
                <option value="male" style={{ display: user.sex === "male" ? "none" : "block" }}>
                  Male
                </option>
                <option
                  value="female"
                  style={{ display: user.sex === "female" ? "none" : "block" }}>
                  Female
                </option>
                <option value="other" style={{ display: user.sex === "other" ? "none" : "block" }}>
                  Other
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="numberPhone" className="font-semibold text-xl mb-1">
              Phone number
            </label>
            <div>
              <input
                className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none shadow-md`}
                type="text"
                value={infoUser.numberPhone}
                name="numberPhone"
                onChange={(e) => handleInfoUser(e)}
              />
            </div>
            <div className="text-red-500 text-md">{errors.numberPhone}</div>
          </div>

          <div className="flex flex-col my-2 w-100 ">
            <label htmlFor="date" className="font-semibold text-xl mb-1 relative">
              Date of Birth
              <BsCalendar3 className="absolute top-[150%] right-[55%] z-50" size={20} />
            </label>
            <DatePicker
              className={`${themeColor.input} px-3 py-2 rounded-md shadow-md focus:outline-none`}
              name="date"
              selected={startDate}
              onChange={handleDateChange}
              showYearDropdown
              showMonthDropdown
              minDate={new Date("1980-01-01")}
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
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
