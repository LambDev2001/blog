import React from "react";
import Button1 from "./Button1";
import Button2 from "./Button2";
import Button3 from "./Button3";
import Button4 from "./Button4";
import { useSelector } from "react-redux";

const StyleButton = ({ text, color, type = "", onClick = () => {} }) => {
  const themeBtn = useSelector((state) => state.themeReducer.themeBtn);
  const styleButton = [Button1, Button2, Button3, Button4];
  const Button = styleButton[themeBtn];

  return <Button text={text} color={color} type={type} onClick={onClick} />;
};

export default StyleButton;
