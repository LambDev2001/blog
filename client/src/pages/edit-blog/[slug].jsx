import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/";

import EditBlog from "../../components/blog/EditBlog";
import { getBlog } from "../../redux/actions/blogAction";

const EditDataBlog = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const functionGetBlog = async () => {
      setBlog(await dispatch(getBlog(slug, token)));
    };
    functionGetBlog();
  }, [dispatch, slug, token]);

  return <div>{blog && <EditBlog blog={blog} />}</div>;
};

export default EditDataBlog;
