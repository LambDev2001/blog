import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Card = ({ blog }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="w-80 bg-white shadow-md rounded-lg overflow-hidden m-4 transform transition-transform hover:scale-105">
      {/* thumbnail */}
      <Link to={`/blog/${blog._id}`}>
        <img className="w-full h-44 object-cover" src={blog.thumbnail} alt="Blog" />
      </Link>

      {/* body */}
      <div className="p-3">
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-500 transition duration-300">
            {blog.title}
          </h2>
        </Link>

        <p
          className={`text-gray-700 text-base ${
            showFullDescription ? "block" : "overflow-hidden h-20"
          }`}>
          {blog.description}
        </p>

        {blog.description.length > 100 && (
          <button
            className="text-blue-500 hover:underline mt-2 cursor-pointer"
            onClick={toggleDescription}>
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        )}
        <div>
          <FontAwesomeIcon icon={faEye} />
          <span className="text-gray-700 ml-2">{blog.views}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
