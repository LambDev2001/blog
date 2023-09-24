import React, {useState} from "react";

const Button1 = ({ text, color, hover, type = "", onClick = () => {} }) => {
  const [isHover, setIsHover] = useState(false);
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
      className={isHover ? hover : color}
      style={customStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      {text}
    </button>
  );
};

export default Button1;
