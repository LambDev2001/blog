import React from "react";
import DatePicker from "react-datepicker";

const ProfileInfo = ({ otherUser, themeColor }) => {
  let originalDate;
  if (otherUser.birthday) {
    originalDate = new Date(otherUser.birthday);
  }

  return (
    <div className={`${themeColor.sub} mt-1 mx-1 p-2 rounded-lg shadow-lg`}>
      <div className="my-2 w-100">
        <div>
          <label htmlFor="numberPhone" className="font-semibold text-xl mb-1">
            Phone number
          </label>
        </div>
        <input
          className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none disabled shadow-md`}
          type="text"
          defaultValue={otherUser.numberPhone}
          name="numberPhone"
        />
      </div>

      <div className="flex flex-col my-2 w-100">
        <label htmlFor="username" className="font-semibold text-xl mb-1">
          Date of Birth
        </label>

        <DatePicker
          className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none shadow-md disabled`}
          selected={!originalDate ? new Date("1990-01-01") : originalDate}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
