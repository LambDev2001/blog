import React, { useState } from "react";

const Button1 = ({ text, color, hover, type = "", onClick = () => {} }) => {
  const [isHover, setIsHover] = useState(false);
  const colorTheme = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];
  const colorHover = ["bg-red-600", "bg-amber-500", "bg-blue-600", "bg-lime-500"];

  const customStyle = {
    borderRadius: "4px",
    overFlow: "hidden",
    fontFamily: "Montserrat",
    boxShadow: "0px 6px 24px 0px rgba(0, 0, 0, 0.2)",
    border: "none",
    padding: "9px 12px",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${isHover ? colorHover[color] : colorTheme[color]} m-2`}
      style={customStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div className="font-bold	text-gray-200	">{text}</div>
    </button>
  );
};

export default Button1;
