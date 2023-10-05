import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { GoShare } from "react-icons/go";

import { IoMdClose } from "react-icons/io";
import { MdOutlineBugReport } from "react-icons/md";

const Blogs2 = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const blogs = useSelector((state) => state.blogReducer);

  return (
    <div>
      {blogs.length > 0 &&
        blogs.map((blog, index) => (
          <div key={index} className={`${themeColor.sub} mx-4 my-3 rounded-lg p-3`}>
            {/* header */}
            <div className="flex justify-between">
              <div className="flex">
                <Link to={"/user/profile/" + blog.author._id}>
                  <img
                    src={blog.author.avatar}
                    alt="thumbnail"
                    className="h-[28px] w-[28px] rounded-circle"
                  />
                  <div className="mx-3">{blog.author.username}</div>
                </Link>
                <div>{blog.timeAgo}</div>
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
                <div className="my-1 text-lg font-bold">{blog.title}</div>

                {/* description */}
                <div className="my-1 text-md">{blog.description}</div>
                {/* interact */}
                <div className="flex">
                  <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
                    <div className="flex cursor-pointer mr-2">
                      <BiLike size={24} />
                      <div className="ml-1">{blog.likes}</div>
                    </div>
                    <div className="flex cursor-pointer">
                      <BiDislike size={24} />
                      <div className="ml-1">{blog.dislikes}</div>
                    </div>
                  </div>
                  <div className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                    <FaRegEye size={24} />
                    <div className="ml-1">{blog.views}</div>
                  </div>
                  <div className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                    <BiCommentDetail size={24} />
                    <div className="ml-1">{blog.comments}</div>
                  </div>
                  <div className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                    <GoShare size={24} />
                    <div className="ml-1">{blog.share}</div>
                  </div>
                </div>
              </div>

              {/* thumbnail */}
              <div className="w-1/4 max-w-[200px] h-100">
                <img src={blog.thumbnail} alt="thumbnail" className="w-100 rounded-md" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blogs2;
