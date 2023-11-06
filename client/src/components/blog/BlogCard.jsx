import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { useSelector } from "react-redux";

// Add fonts to whitelist and register them
const Header = Quill.import("formats/header");
Header.whitelist = [1, 2, 3, 4, 5, 6];
Quill.register(Header, true);

const Blog = ({ blog, setBlog = () => {}, readOnly = false }) => {
  const themeColor = useSelector((state) => state.themeUserReducer);

  let modules = {
    toolbar: [
      [{ font: [] }, { header: Header.whitelist }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "image", "video"],
      [{ size: ["small", false, "large", "huge"] }],
    ],
  };

  if (readOnly) modules = { toolbar: [] };

  return (
    <div className={`${themeColor.sub} ${themeColor.border} border-1 shadow-md`}>
      <ReactQuill
        value={blog.content}
        readOnly={readOnly}
        onChange={(e) => setBlog({ ...blog, content: e })}
        theme={"snow"}
        modules={modules}
      />
    </div>
  );
};

export default Blog;
