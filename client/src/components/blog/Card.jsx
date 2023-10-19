import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className=" bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
      {/* thumbnail */}
      <Link to={`/blog/${blog._id}`}>
        <img className="w-full h-40 object-cover" src={blog.thumbnail} alt="Blog" />
      </Link>

      {/* body */}
      <div className="py-1 px-2">
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-500 transition duration-300 leading-6">
            {blog.title}
          </h2>
        </Link>

        <p
          className={`text-gray-700 text-md leading-6 ${
            showFullDescription ? "block" : "overflow-hidden h-11"
          }`}>
          {blog.description}
        </p>
        {blog.description.length > 70 && (
          <button
            className="flex ml-auto mr-2 mb-2 text-blue-500 hover:underline mt-2 cursor-pointer"
            onClick={toggleDescription}>
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
