import React from "react";

import { splitLabel } from "../../../utils/SplitLabel";

const Text = ({ name, onChange, errors={} }) => {
  return (
    <div className="mb-2 relative">
      <label htmlFor={name} className="font-semibold text-gray-700 block mb-1">
        {splitLabel(name)}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={`Enter your ${name}`}
        className="text-gray-700 p-2 w-full h-10 rounded outline-none shadow-md focus:border-b-2 focus:border-blue-500 hover:outline-solid hover:outline-lightgray"
        onChange={(e) => onChange(e)}
      />
      <div className="text-red-500 text-md">{errors[name]}</div>
    </div>
  );
};

export default Text;
