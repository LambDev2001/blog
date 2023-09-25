import React, { useState } from "react";

import Header from "../../components/global/Header";
import Button1 from "../../components/global/theme/button/Button1";
import Button2 from "../../components/global/theme/button/Button2";
import Button3 from "../../components/global/theme/button/Button3";
import Button4 from "../../components/global/theme/button/Button4";
import { useDispatch, useSelector } from "react-redux";

const Buttons = () => {
  const styleButton = [Button1, Button2, Button3, Button4];
  const textButton = ["Danger", "Warning", "Info", "Success"];
 
  const themeBtn = useSelector((state) => state.themeReducer.themeBtn);
  const [selectedStyle, setSelectedStyle] = useState(themeBtn);
  const dispatch = useDispatch();

  const handleStyleChange = (index) => {
    setSelectedStyle(index);
    dispatch({ type: "UPDATE_THEME", payload: { themeBtn: index } });
  };

  return (
    <div className="mx-2">
      <Header />
      <div className="my-2">
        <div className="text-2xl font-semibold">Choose your theme style</div>
      </div>
      <div className="flex flex-wrap justify-between">
        {styleButton.map((Button, index) => (
          <div key={index} className="bg-gray-200 rounded-lg shadow-md p-4 space-x-2 my-2">
            <div className="flex mb-2">
              <input
                type="radio"
                className="checked:bg-blue-500"
                checked={selectedStyle === index}
                onChange={() => handleStyleChange(index)}
              />{" "}
              <div className="mx-2">Style {index + 1}</div>
            </div>
            {textButton.map((text, buttonIndex) => (
              <Button
                key={buttonIndex}
                text={text}
                color={buttonIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
