import React, { useState } from "react";

import { IoEye, IoEyeOff } from "react-icons/io5";

import { splitLabel } from "../../../utils/SplitLabel";

const Password = ({ name, onChange, errors }) => {
  const [hidePass, setHidePass] = useState({ [name]: true });

  const renderEye = (key) => {
    if (hidePass[key] === true)
      return (
        <IoEyeOff
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          size={20}
          color="black"
          onClick={() => handleHidePass(key)}
        />
      );
    else
      return (
        <IoEye
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          size={20}
          color="black"
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

  return (
    <div className="mb-2 relative">
      <label htmlFor={name} className="text-gray-700 font-semibold block mb-1">
        {splitLabel(name)}
      </label>
      <div className="relative">
        <input
          type={hidePass[name] ? "password" : "text"}
          id={name}
          name={name}
          placeholder="Enter your password"
          className="text-gray-700 p-2 w-full h-10 rounded outline-none shadow-md focus:border-b-2 focus:border-blue-500 hover:outline-solid hover:outline-lightgray"
          onChange={(e) => onChange(e)}
        />
        {renderEye(name)}
      </div>

      <div className="text-red-500 text-md">{errors[name]}</div>
    </div>
  );
};

export default Password;
