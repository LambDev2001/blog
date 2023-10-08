import React from "react";
import { splitLabel } from "../../utils/SplitLabel";

export const Text = ({ name, handleText }) => {
  return (
    <div className="mb-2">
      <label htmlFor={name} className="font-semibold block mb-1">
        {splitLabel(name)}
      </label>
      <input
        id={name}
        name={name}
        placeholder={`Enter your ${name}`}
        className="p-2 w-full h-10 rounded outline-none shadow-md focus:border-b-2 focus:border-blue-500 hover:outline-solid hover:outline-lightgray"
        onChange={(e) => handleText(e)}
      />
    </div>
  );
};
