import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ShowBlog from "../../components/blog/ShowBlog";
import { getBlog, increaseView } from "../../redux/actions/blogAction";
import { getComments } from "../../redux/actions/commentAction";

const BlogPage = () => {
  const [hasIncreased, setHasIncreased] = useState(false);
  const token = useSelector((state) => state.authReducer.accessToken);
  const comments = useSelector((state) => state.commentReducer);
  const blog = useSelector((state) => state.blogReducer[0]);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(slug, token));
    dispatch(getComments(slug, token));
  }, [dispatch, token, slug]);

  useEffect(() => {
    let timeout;
    if (!hasIncreased) {
      timeout = setTimeout(() => {
        dispatch(increaseView(blog._id, token));
        setHasIncreased(true);
      }, 30000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [hasIncreased, blog, dispatch, token]);

  return <div>{blog && <ShowBlog blog={blog} comments={comments} />}</div>;
};

export default BlogPage;
