import React, { useState } from "react";

import Header from "../../components/global/Header";
import Button1 from "../../components/global/theme/Button1";
import Button2 from "../../components/global/theme/Button2";
import Button3 from "../../components/global/theme/Button3";
import Button4 from "../../components/global/theme/Button4";

const Buttons = () => {
  const styleButton = [Button1, Button2, Button3, Button4];
  const textButton = ["Danger", "Warning", "Info", "Success"];
  const colorTheme = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];
  const colorHover = ["bg-red-600", "bg-amber-500", "bg-blue-600", "bg-lime-500"];

  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleStyleChange = (index) => {
    setSelectedStyle(index);
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
                color={colorTheme[buttonIndex]}
                hover={colorHover[buttonIndex]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
