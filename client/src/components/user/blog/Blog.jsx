import React from "react";

import Blog1 from "./Blog1";
import Blog2 from "./Blogs2"

const Blog = ({type=1, data="", readOnly=false}) => {
  const styleBlogs = [Blog1, Blog2]
  const Blog = styleBlogs[type-1]

  return <Blog data={data} readOnly={readOnly} />
};

export default Blog;
