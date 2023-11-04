import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <img
        src="https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698597029/blog/pngegg_1_q7bdzi.png"
        alt=""
        className="animate-spin h-10 w-10 mr-3"
      />

      <span className={`${themeColor.text} text-3xl font-middle`}>Loading...</span>
    </div>
  );
};

export default Loading;
