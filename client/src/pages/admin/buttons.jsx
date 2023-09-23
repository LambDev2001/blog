import React from "react";

import Header from "../../components/global/Header";
import Button1 from "../../components/global/theme/Button1";

const Buttons = () => {
  const textButton = ["Danger", "Warning", "Info", "Success"];
  const colorTheme = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];
  const colorHover = ["bg-red-600", "bg-amber-500", "bg-blue-600", "bg-lime-500"];

  return (
    <div className="mx-2">
      <Header />
      <div className="flex flex-wrap">
        <div className="flex bg-gray-200 rounded-lg shadow-md p-4 space-x-2">
          {textButton.map((text, index) => (
            <Button1 key={index} text={text} color={colorTheme[index]} hover={colorHover[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
