import React from "react";
import DatePicker from "react-datepicker";

import { BsCalendar3 } from "react-icons/bs";

import { splitLabel } from "../../utils/SplitLabel";

const ProfileInfo = ({ otherUser, themeColor }) => {
  let originalDate;
  if (otherUser.birthday) {
    originalDate = new Date(otherUser.birthday);
  }

  return (
    <div className={`${themeColor.sub} mt-1 mx-1 p-2 rounded-lg shadow-lg`}>
      <div className="my-2 w-100">
        <div>
          <div>
            <label htmlFor="sex" className="font-semibold text-xl mb-1">
              Sex
            </label>
          </div>
          <input
            className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none disabled shadow-md`}
            type="text"
            defaultValue={!otherUser.sex ? "None" : splitLabel(otherUser.sex)}
            name="sex"
            disabled
          />
        </div>
        <div>
          <label htmlFor="numberPhone" className="font-semibold text-xl mb-1">
            Phone number
          </label>
        </div>
        <input
          className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none disabled shadow-md`}
          type="text"
          defaultValue={!otherUser.numberPhone ? "None" : otherUser.numberPhone}
          name="numberPhone"
          disabled
        />
      </div>

      <div className="my-2 w-100 ">
        <div className="font-semibold text-xl mb-1 relative">
          Date of Birth
          <BsCalendar3 className="absolute top-[150%] right-[75%] z-50" size={20} />
        </div>
        {!originalDate ? (
          <input
            className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none disabled shadow-md`}
            type="text"
            defaultValue={"None"}
            name="day"
            disabled
          />
        ) : (
          <DatePicker
            className={`${themeColor.input} px-3 py-2 rounded-md focus:outline-none shadow-md disabled`}
            selected={originalDate}
            disabled
          />
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
