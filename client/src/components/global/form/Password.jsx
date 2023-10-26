import React, { useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { splitLabel } from "../../../utils/SplitLabel";

const Password = ({ name, onChange, errors }) => {
  const [hidePass, setHidePass] = useState(true);

  return (
    <div className="mb-2 relative">
      <label htmlFor={name} className="text-gray-700 font-semibold block mb-1">
        {splitLabel(name)}
      </label>
      <input
        type={hidePass ? "password" : "text"}
        id={name}
        name={name}
        placeholder="Enter your password"
        className="text-gray-700 p-2 w-full h-10 rounded outline-none shadow-md focus:border-b-2 focus:border-blue-500 hover:outline-solid hover:outline-lightgray"
        onChange={(e) => onChange(e)}
      />
      <div className="text-red-500 text-md">{errors[name]}</div>

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
  );
};

export default Password;
