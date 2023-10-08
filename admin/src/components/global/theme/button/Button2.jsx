import React, { useState } from "react";

const Button1 = ({ text, color, type = "", onClick = () => {} }) => {
  const [isHover, setIsHover] = useState(false);
  const colorTheme = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];
  const colorHover = ["bg-red-600", "bg-amber-500", "bg-blue-600", "bg-lime-500"];
  const customStyle = {
    color: "white",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${isHover ? colorHover[color] : colorTheme[color]} m-2`}
      style={customStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      {text}
    </button>
  );
};

export default Button1;
