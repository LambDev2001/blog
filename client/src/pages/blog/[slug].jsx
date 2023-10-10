import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ShowBlog from "../../components/blog/ShowBlog";
import { getBlog } from "../../redux/actions/blogAction";
import { getComments } from "../../redux/actions/commentAction";

const BlogPage = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const comments = useSelector((state) => state.commentReducer);
  const blog = useSelector((state) => state.blogReducer[0]);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(slug, token));
    dispatch(getComments(slug, token));
  }, [dispatch, token, slug]);

  return <div>{blog && <ShowBlog blog={blog} comments={comments} />}</div>;
};

export default BlogPage;
