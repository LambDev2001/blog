import React, {useState} from "react";

const Button1 = ({ text, color, hover, type = "", onClick = () => {} }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${isHover ? hover : color} text-white px-4 py-2 rounded-md ml-2`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      {text}
    </button>
  );
};

export default Button1;
