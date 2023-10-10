import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/";

import EditBlog from "../../components/blog/EditBlog";
import { getBlog } from "../../redux/actions/blogAction";

const EditDataBlog = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(slug, token));
  }, [dispatch, slug, token]);

  return <EditBlog />;
};

export default EditDataBlog;
