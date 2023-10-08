import React, { useState } from "react";

const Button1 = ({ text, color, type = "", onClick = () => {} }) => {
  const colorTheme = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];
  const colorHover = ["bg-red-600", "bg-amber-500", "bg-blue-600", "bg-lime-500"];
  const [isHover, setIsHover] = useState(false);
  const colorBtn = colorTheme[color].replace(/-/, " ").split(" ")[1];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-black font-bold px-3 py-2 m-2 rounded-md border-1 border-${colorBtn} ${
        isHover ? colorHover[color] : "bg-white"
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      {text}
    </button>
  );
};

export default Button1;
