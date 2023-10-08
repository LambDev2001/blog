import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import Header from "../../components/global/Header";
import Menu from "../../components/Menu";

const Color = () => {
  const dispatch = useDispatch();

  const colors = [
    { outside: "bg-gray-200", inside: "bg-white", active: "bg-gray-400" },
    { outside: "bg-cyan-100", inside: "bg-emerald-50", active: "bg-cyan-400" },
    { outside: "bg-fuchsia-100", inside: "bg-white", active: "bg-fuchsia-400" },
    { outside: "bg-teal-400", inside: "bg-green-200", active: "bg-orange-400" },
    { outside: "bg-stone-500", inside: "bg-neutral-200", active: "bg-orange-200" },
  ];

  const curColor = useSelector((state) => state.themeReducer.themeColor);
  const indexColor = colors.findIndex(
    (color) =>
      color.outside === curColor.outside &&
      color.inside === curColor.inside &&
      color.active === curColor.active
  );
  const [selectedStyle, setSelectedStyle] = useState(indexColor);

  const handleStyleChange = (index) => {
    setSelectedStyle(index);
    dispatch({ type: "UPDATE_THEME", payload: { themeColor: colors[index] } });
  };

  return (
    <div className="d-flex">
      <Menu />
      <div className="w-100">
        <div className="mx-2">
          <AdminRouteWrapper />
          <Header content="Colors Theme" />

          <div className="text-2xl">Choose Color</div>
          <div className="flex flex-wrap">
            {colors.map((color, index) => {
              return (
                <div key={index} className={`${color.outside} py-3 px-4 m-4 rounded-md`}>
                  <div className="flex mb-2">
                    <input
                      type="radio"
                      className="checked:bg-blue-500"
                      checked={selectedStyle === index}
                      onChange={() => handleStyleChange(index)}
                    />{" "}
                    <div className="mx-2">Style {index + 1}</div>
                  </div>
                  <div className={`${color.inside} p-3 rounded-md`}>
                    <div className={`${color.active} p-2 rounded-sm`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Color;
