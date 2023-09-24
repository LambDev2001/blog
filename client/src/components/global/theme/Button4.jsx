import React, { useState } from "react";

const Button1 = ({ text, color, hover, type = "", onClick = () => {} }) => {
  const [isHover, setIsHover] = useState(false);
  const colorBtn = color.replace(/-/, " ").split(" ")[1];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-black font-bold px-3 py-2 rounded-md ml-2 border-1 border-${colorBtn} ${
        isHover ? hover : "bg-white"
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      {text}
    </button>
  );
};

export default Button1;
