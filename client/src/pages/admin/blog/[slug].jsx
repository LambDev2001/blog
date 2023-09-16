import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment, AiOutlineEye } from "react-icons/ai";
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
        <div className="bg-gray-200 p-2 mb-2 rounded-lg shadow-md flex flex-wrap justify-around">
          <div className="flex-[5] mx-3 bg-white rounded-lg shadow-md p-3">
            <div className="flex justify-content-start align-items-end m-2">
              <h2 className="text-xl font-semibold mr-3">Title:</h2>
              <p className="text-gray-600">{blog.title}</p>
            </div>

            <div className="flex justify-content-start align-items-end m-2">
              <h2 className="text-xl font-semibold mr-3">Category:</h2>
              <p className="text-gray-600">{blog.category}</p>
            </div>

            <div className="m-2">
              <h2 className="text-xl font-semibold mr-3">Description:</h2>
              <p className="text-gray-600">{blog.description}</p>
            </div>

            <div className="flex justify-content-start align-items-end m-2">
              <h2 className="text-xl font-semibold mr-3">Status:</h2>
              <p className="text-gray-600">{blog.status}</p>
            </div>

            <div className="bg-gray-200 p-4 mb-2 rounded-lg shadow-md flex justify-around">
              <div className="d-flex align-items-center">
                <AiOutlineLike size={30} className="mx-2" /> {blog.likes}
              </div>
              <div className="d-flex align-items-center">
                <AiOutlineDislike size={30} className="mx-2" /> {blog.dislikes}
              </div>
              <div className="d-flex align-items-center">
                <AiOutlineComment size={30} className="mx-2" /> {blog.comments}
              </div>
              <div className="d-flex align-items-center">
                <PiShareFat size={30} className="mx-2" /> {blog.share}
              </div>
              <div className="d-flex align-items-center">
                <AiOutlineEye size={30} className="mx-2" /> {blog.views}
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
