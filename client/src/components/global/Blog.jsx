import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { useSelector } from "react-redux";

// Add fonts to whitelist and register them
const Header = Quill.import("formats/header");
Header.whitelist = [1, 2, 3, 4, 5, 6];
Quill.register(Header, true);

const Blog = ({ blog, readOnly }) => {
  const color = useSelector((state) => state.themeReducer.themeColor);
  const modules = {
    toolbar: [
      [{ font: [] }, { header: Header.whitelist }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "image", "video"],
      [{ size: ["small", false, "large", "huge"] }],
    ],
  };

  return (
    <div className={`${color.outside} rounded-lg shadow-md overflow-hidden p-1`}>
      <div className="bg-white">
        <ReactQuill value={blog.content} readOnly={readOnly} theme={"snow"} modules={modules} />
      </div>
    </div>
  );
};

export default Blog;
