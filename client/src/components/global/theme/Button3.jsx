import React, { useState } from "react";

const Button1 = ({ text, color, hover, type = "", onClick = () => {} }) => {
  const [isHover, setIsHover] = useState(false);
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
      className={`${isHover ? hover : color}`}
      style={customStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div className="font-bold	text-gray-200	">{text}</div>
    </button>
  );
};

export default Button1;
