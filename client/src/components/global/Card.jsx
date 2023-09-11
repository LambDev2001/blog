import React from "react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <div className="min-w-[350px] max-w-[30%] max-h-[550px] rounded overflow-hidden shadow-lg m-2">
      <Link to={`/blog/${blog._id}`}>
        <img className="h-[220px] w-100" src={blog.thumbnail} alt="Blog" />
      </Link>
      <div className="px-2 py-2">
        <div className="font-bold text-xl mb-2">{blog.title}</div>
        <p className="text-gray-700 text-base">{blog.description}</p>
      </div>
    </div>
  );
};

export default Card;
