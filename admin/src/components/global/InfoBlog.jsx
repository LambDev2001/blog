import React from "react";
import { useSelector } from "react-redux";

import { AiOutlineLike, AiOutlineDislike, AiOutlineComment, AiOutlineEye } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";

const InfoBlog = ({ blog }) => {
  const color = useSelector((state) => state.themeReducer.themeColor);

  return (
    <div className={`${color.outside} my-2 rounded-lg shadow-md flex flex-wrap justify-around`}>
      {/* information */}
      <div className={`${color.inside} flex-[5] m-3 p-3  rounded-lg shadow-md min-w-[620px]`}>
        <div className="flex justify-content-start align-items-end m-2">
          <h2 className="text-xl font-semibold mr-3">Title:</h2>
          <p className="text-gray-600">{blog.title}</p>
        </div>

        <div className="flex justify-content-start align-items-end m-2">
          <h2 className="text-xl font-semibold mr-3">Category:</h2>
          <p className="text-gray-600">{blog.category}</p>
        </div>

        <div className="m-2">
          <h2 className="text-xl font-semibold mr-3">Description:</h2>
          <p className="text-gray-600">{blog.description}</p>
        </div>

        <div className="flex justify-content-start align-items-end m-2">
          <h2 className="text-xl font-semibold mr-3">Status:</h2>
          <p className="text-gray-600">{blog.status}</p>
        </div>

        <div className={`${color.outside} p-4 mb-2 rounded-lg shadow-md flex justify-around`}>
          <div className="d-flex align-items-center">
            <AiOutlineLike size={30} className="mx-2" /> {blog.likes}
          </div>
          <div className="d-flex align-items-center">
            <AiOutlineDislike size={30} className="mx-2" /> {blog.dislikes}
          </div>
          <div className="d-flex align-items-center">
            <AiOutlineComment size={30} className="mx-2" /> {blog.comments}
          </div>
          <div className="d-flex align-items-center">
            <PiShareFat size={30} className="mx-2" /> {blog.share}
          </div>
          <div className="d-flex align-items-center">
            <AiOutlineEye size={30} className="mx-2" /> {blog.views}
          </div>
        </div>
      </div>

      {/* thumbnail */}
      <div
        className={`${color.inside} flex-[2] m-3 p-3 rounded-lg shadow-md flex flex-col align-items-center min-w-[300px]`}>
        <h1 className="text-2xl font-semibold mb-2">Thumbnail</h1>
        <img src={blog.thumbnail} alt="thumbnail" className="w-[333px] rounded-lg " />
      </div>
    </div>
  );
};

export default InfoBlog;
