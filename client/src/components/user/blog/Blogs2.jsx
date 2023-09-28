import React from "react";
import { useSelector } from "react-redux";

import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { GoShare } from "react-icons/go";

import { IoMdClose } from "react-icons/io";
import { MdOutlineBugReport } from "react-icons/md";

const Blogs2 = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);

  return (
    <div className={`${themeColor.sub} mx-4 my-3 rounded-lg p-3`}>
      {/* header */}
      <div className="flex justify-between">
        <div className="flex">
          <img
            src="https://imgs.search.brave.com/N1nj9QYN-j2SKJNz9Q6qTxDw-zFieCBL6AZaGyozGjU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1Xzdy/NGp2cC9zdHlsZXMv/Y29tbXVuaXR5SWNv/bl8xZHhlanQ1Y3Ux/c2ExLnBuZw"
            alt="thumbnail"
            className="h-[28px] w-[28px] rounded-circle"
          />
          <div className="mx-3">Name</div>
          <div>Time</div>
        </div>
        <div className="flex">
          <MdOutlineBugReport color="white" size={24} className="mx-1" />
          <IoMdClose color="white" size={24} className="mx-1" />
        </div>
      </div>

      {/* description, interact and thumbnail */}
      <div className="flex flex-wrap justify-between">
        <div className="w-3/4">
          {/* title */}
          <div className="my-1 text-lg font-bold">Name character</div>

          {/* description */}
          <div className="my-1 text-md">
            Bukit Panjang woman who poured pee in neighbour's shoes now allegedly sprays soy sauce
            on laundry
          </div>
          {/* interact */}
          <div className="flex">
            <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
              <div className="flex mr-2">
                <BiLike size={24} />
                <div className="ml-1">210</div>
              </div>
              <div className="flex">
                <BiDislike size={24} />
                <div className="ml-1">50</div>
              </div>
            </div>
            <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
              <FaRegEye size={24} />
              <div className="ml-1">1707</div>
            </div>
            <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
              <BiCommentDetail size={24} />
              <div className="ml-1">70</div>
            </div>
            <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
              <GoShare size={24} />
              <div className="ml-1">10</div>
            </div>
          </div>
        </div>

        {/* thumbnail */}
        <div className="w-1/4 max-w-[200px] h-100">
          <img
            src="https://imgs.search.brave.com/0O8pH-KjwLpF9VDJyN2ckjGvwH2gNY0z_-yOu0QLye4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly96YmFz/ZS1nbG9iYWwuemlu/Z2Zyb250LmNvbS9z/YWFzYm94L3Jlc291/cmNlcy9qcGVnL2Fu/aW1lLWFpLWFydC1n/ZW5lcmF0b3I5LWZv/dG9yLTIwMjMwODE4/OTUxMi0xX180MzVi/MzhiNWEwOGYxY2E4/MTZlZDA0YTVmYWE4/NWVmMy5qcGVn"
            alt="thumbnail"
            className="w-100 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs2;
