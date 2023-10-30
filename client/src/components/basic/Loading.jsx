import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      {/* <div className="loading-spin">
        <img src="https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698595035/blog/pngegg_x3qjfr.png" alt="" className="w-[200px] h-[200px]"  />
        <img
          src="https://cdn.pixabay.com/photo/2021/02/25/14/12/rinnegan-6049194_1280.png"
          alt=""
          className="w-[200px] h-[200px]"
        />
      </div> */}

      <img
        src="https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698597029/blog/pngegg_1_q7bdzi.png"
        alt=""
        className="animate-spin h-10 w-10 text-white mr-3"
      />

      <span className="text-white text-3xl font-middle">Loading...</span>
    </div>
  );
};

export default Loading;
