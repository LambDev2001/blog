import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <div className=" bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 h-[280px]">
      {/* thumbnail */}
      <Link to={`/blog/${blog._id}`}>
        <img className="w-full h-40 object-cover" src={blog.thumbnail} alt="Blog" />
      </Link>

      {/* body */}
      <div className="py-1 px-2">
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-500 transition duration-300 text-ellipsis overflow-hidden whitespace-nowrap">
            {blog.title}
          </h2>
        </Link>

        <p
          className={`hideDescription text-justify w-100 h-[60px] text-gray-700 text-sm 
          `}>
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
