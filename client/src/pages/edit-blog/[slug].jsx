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

  const height = window.innerHeight - 60;

  return (
    <div className={`w-3/5 custom-scroll-container`} style={{ height: `${height}px` }}>
      <div className="custom-scroll-content h-100 overflow-auto px-4">
        <EditBlog />
      </div>
    </div>
  );
};

export default EditDataBlog;
