import React from "react";

import Blog1 from "./Blog1";
import Blog2 from "./Blog2"

const Blog = ({type=1, handleLink=()=>{}, readOnly=true}) => {
  const styleBlogs = [Blog1, Blog2]
  const Blog = styleBlogs[type-1]

  return <Blog handleLink={handleLink} />
};

export default Blog;
