import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment, AiOutlineEye } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";

import Header from "../../components/global/Header";
import Blog from "../../components/global/Blog";
import DeleteModal from "../../components/global/modal/DeleteModal";
import Button from "../../components/global/theme/button/Button";
import { deleteBlog, getBlog } from "../../redux/actions/blogAction";
import { updateBlogStatus } from "../../redux/actions/blogAction";

const MyEditor = () => {
  const [openAction, setOpenAction] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const token = useSelector((state) => state.authReducer.accessToken);
  const blog = useSelector((state) => state.blogReducer[0]);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const history = useHistory();

  const colorStatus = [
    "rgba(240, 240, 240, 0.8)",
    "rgba(85, 230, 86, 0.8)",
    "rgba(255, 235, 59, 0.8)",
    "rgba(255, 99, 71, 0.8)",
  ];

  useEffect(() => {
    dispatch(getBlog(slug, token));
  }, [dispatch, slug, token]);

  const closeModal = () => {
    setOpenModal(false);
    setOpenAction(false);
  };

  const handleDelete = () => {
    setOpenAction(false);
    dispatch(deleteBlog(blog._id, token));
    history.push("/blogs");
  };

  const handleStatus = (e, status) => {
    e.preventDefault();
    setOpenAction(false);
    dispatch(updateBlogStatus(blog, status, token));
  };

  return (
    <div className=" relative">
      {openModal && <DeleteModal handleDelete={handleDelete} closeModal={closeModal} />}
      <Header content="Manager Blog" />

      {/* action btn */}
      <div className="sticky top-[110px] z-[900] flex justify-end items-center space-x-2 cursor-pointer h-0">
        {openAction && (
          <div className={`${color.inside} p-2 rounded-lg shadow-md border-element`}>
            <Button text={"Delete"} color={0} onClick={() => setOpenModal(true)} />
            <Button text={"Hidden"} color={2} onClick={(e) => handleStatus(e, "hidden")} />
            <Button text={"Normal"} color={3} onClick={(e) => handleStatus(e, "normal")} />
          </div>
        )}
        <div
          className="rounded-full bg-cyan-400 p-3 m-2 h-[60px] w-[60px] text-center flex justify-center items-center"
          onClick={() => setOpenAction(!openAction)}>
          <span className="text-white font-semibold">Action</span>
        </div>
      </div>

      {/* blog */}
      <div className="w-[80%] m-auto">
        <div
          className={`${color.outside} p-2 mb-2 rounded-lg shadow-md flex flex-wrap justify-around`}>
          <div className={`${color.inside} flex-[5] mx-3 rounded-lg shadow-md p-3`}>
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

            <div className="flex justify-content-start align-items-center m-2">
              <h2 className="text-xl font-semibold mr-3">Status:</h2>
              <p
                className="text-gray-600 rounded text-center border-element w-[70px] p-1"
                style={{
                  backgroundColor: `${blog.status === "normal" ? colorStatus[1] : colorStatus[2]}`,
                }}>
                {blog.status}
              </p>
            </div>

            <div className={`${color.outside} p-4 mb-2 rounded-lg shadow-md flex justify-around`}>
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
          <div
            className={`${color.inside} flex-[2] mx-3 rounded-lg shadow-md p-3 flex flex-col align-items-center`}>
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
