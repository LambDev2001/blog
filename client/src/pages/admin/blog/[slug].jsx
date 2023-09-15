import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";

import { getBlog } from "../../../redux/actions/blogAction";
import Header from "../../../components/global/Header";
import Blog from "../../../components/global/Blog";

const MyEditor = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const blog = useSelector((state) => state.blogReducer);

  useEffect(() => {
    dispatch(getBlog(slug, token));
  }, [dispatch, slug, token]);

  return (
    <div className="relative">
      <Header />

      <div className="w-[80%] m-auto">
        <div className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md flex flex-wrap justify-around">
          <div className="flex-[4] mx-3 bg-white rounded-lg shadow-md p-3">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold mb-2">Title</h1>
              <p className="text-lg">{blog.title}</p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-2">Description</h1>
              <p className="text-lg">{blog.description}</p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-2">Date created</h1>
              <p className="text-lg">{blog.createdAt}</p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-2">Status</h1>
              <p className="text-lg">{blog.status}</p>
            </div>

            <div className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md flex">
              <div className="d-flex mx-4">
                <AiOutlineLike size={30} /> {blog.countLike}
              </div>
              <div className="d-flex mx-4">
                <AiOutlineDislike size={30} /> {blog.countDislike}
              </div>
              <div className="d-flex mx-4">
                <AiOutlineComment size={30} /> {blog.countComment}
              </div>
              <div className="d-flex mx-4">
                <PiShareFat size={30} /> {blog.share}
              </div>
            </div>
          </div>
          <div className="flex-[2] mx-3 bg-white rounded-lg shadow-md p-3 flex flex-col align-items-center ">
            <h1 className="text-2xl font-semibold mb-2">Thumbnail</h1>
            <img src={blog.thumbnail} alt="thumbnail" className="w-[333px] rounded-lg " />
          </div>
        </div>

        <Blog blog={blog} readOnly={true} />
      </div>
    </div>
  );
};

export default MyEditor;
