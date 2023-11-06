import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { BiLike, BiDislike, BiSolidLike, BiSolidDislike, BiCommentDetail } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { GoShare } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { MdOutlineBugReport } from "react-icons/md";

import Comment from "../comment/Comment";
import ModalReportBlog from "../modal/ModalReportBlog";
import ModalDeleteBlog from "../modal/ModalDeleteBlog";
import { dislikeBlog, likeBlog, increaseShare, removeBlog } from "../../redux/actions/blogAction";
import { followUser } from "../../redux/actions/userAction";
import { getComments } from "../../redux/actions/commentAction";

const Blog2 = ({ handleLink = null, isOwner = false }) => {
  const [openComments, setOpenComments] = useState(-1);
  const [isReport, setIsReport] = useState(null);
  const [modalDeleteBlog, setModalDeleteBlog] = useState(-1);
  const [isCopyLink, setIsCopyLink] = useState(-1);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const blogs = useSelector((state) => state.blogReducer);
  const comments = useSelector((state) => state.commentReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  const colorStatus = [
    "rgba(240, 240, 240, 0.8)",
    "rgba(85, 230, 86, 0.8)",
    "rgba(255, 235, 59, 0.8)",
    "rgba(255, 99, 71, 0.8)",
  ];

  if (!handleLink) {
    handleLink = (link) => {
      history.push(link);
    };
  }

  const handleLike = (id) => {
    if (!token) handleLink("");
    else dispatch(likeBlog(id, token));
  };

  const handleDislike = (id) => {
    if (!token) handleLink("");
    else dispatch(dislikeBlog(id, token));
  };

  const handleFollow = (idUser) => {
    if (!token) handleLink("");
    else dispatch(followUser(idUser, token));
  };

  const handleComment = (index, idBlog) => {
    if (!token) handleLink("");
    else if (openComments !== index) {
      dispatch(getComments(idBlog));
      setOpenComments(index);
    } else {
      setOpenComments(-1);
    }
  };

  const handleShowReport = (idBlog) => {
    if (!token) handleLink("");
    else if (isReport === idBlog || idBlog === null) setIsReport(null);
    else setIsReport(idBlog);
  };

  const handleRemoveBlog = async (idBlog) => {
    if (!token) handleLink("");
    else dispatch(removeBlog(idBlog));
  };

  const handleDeleteBlog = (idBlog) => {
    idBlog === modalDeleteBlog ? setModalDeleteBlog(-1) : setModalDeleteBlog(idBlog);
  };

  const handleShareBlog = (idBlog) => {
    navigator.clipboard.writeText(`http://localhost:3000/blog/${idBlog}`);
    dispatch(increaseShare(idBlog));
    setIsCopyLink(idBlog);
  };

  useEffect(() => {
    let timeout;
    if (isCopyLink !== -1) {
      timeout = setTimeout(() => {
        setIsCopyLink(-1);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopyLink]);

  return (
    <div>
      {blogs.length > 0 &&
        blogs.map((blog, index) => {
          if (blog.isRemove === true) return <div></div>;

          return (
            <div key={index} className={themeColor.text}>
              {/* Blog */}
              <div
                className={`${themeColor.sub} ${themeColor.border} border-1 rounded-md mx-4 my-2 px-3 pt-3 shadow-md`}>
                {/* header */}
                <div className="flex justify-between">
                  {/* start */}
                  <div className="flex">
                    <div className="flex align-items-center">
                      <div
                        onClick={() => handleLink(`/profile/${blog.author._id}`)}
                        className="flex cursor-pointer">
                        <img
                          src={blog.author.avatar}
                          alt="thumbnail"
                          className="h-[28px] w-[28px] rounded-circle"
                        />
                        <div className="mx-1">{blog.author.username}</div>
                      </div>
                      <div className="mx-2">{blog.timeAgo}</div>
                    </div>

                    <div className={`${themeColor.input} mx-2 px-3 py-2 rounded-full `}>
                      {blog.category}
                    </div>
                    {isOwner && (
                      <div
                        className={`px-3 py-2 rounded-full`}
                        style={{
                          color: blog.status === "normal" ? colorStatus[1] : colorStatus[2],
                          border: `1px solid ${
                            blog.status === "normal" ? colorStatus[1] : colorStatus[2]
                          }`,
                        }}>
                        {blog.status}
                      </div>
                    )}
                  </div>

                  {/* end */}
                  <div className="flex align-items-center">
                    {!blog.isFollowing && (
                      <div
                        className="mx-4 border-1 border-red-600 text-red-600 py-1 px-2 rounded-md cursor-pointer"
                        onClick={() => handleFollow(blog.author._id)}>
                        Follow
                      </div>
                    )}
                    <div className="flex">
                      {isOwner && (
                        <div
                          className="mx-1 mb-auto rounded-md bg-red-500 py-1 px-2 cursor-pointer text-white"
                          onClick={() => handleDeleteBlog(blog._id)}>
                          Delete
                        </div>
                      )}

                      <MdOutlineBugReport
                        size={24}
                        className="mx-1 my-auto cursor-pointer"
                        onClick={() => handleShowReport(blog._id)}
                      />
                      <IoMdClose
                        size={24}
                        className="mx-1 my-auto cursor-pointer"
                        onClick={() => handleRemoveBlog(blog._id)}
                      />
                    </div>
                  </div>
                </div>

                {/* description, interact and thumbnail */}
                <div className="flex flex-wrap justify-between h-100">
                  <div className="w-3/4 flex flex-col justify-between">
                    <div>
                      {/* title */}
                      <div className="my-1 text-lg font-bold">{blog.title}</div>

                      {/* description */}
                      <div className="my-1 text-md">{blog.description}</div>
                    </div>

                    {/* interact */}
                    <div className="flex">
                      <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
                        <div className="flex cursor-pointer mr-2">
                          {blog.isLike === true ? (
                            <BiSolidLike size={24} color="blue" />
                          ) : (
                            <BiLike size={24} onClick={() => handleLike(blog._id)} />
                          )}
                          <div className="ml-1">{blog.likes}</div>
                        </div>
                        <div className="flex cursor-pointer">
                          {blog.isLike === false ? (
                            <BiSolidDislike size={24} color="blue" />
                          ) : (
                            <BiDislike size={24} onClick={() => handleDislike(blog._id)} />
                          )}
                          <div className="ml-1">{blog.dislikes}</div>
                        </div>
                      </div>
                      <div
                        className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                        <FaRegEye size={24} />
                        <div className="ml-1">{blog.views}</div>
                      </div>
                      <div
                        className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                        <BiCommentDetail size={24} onClick={() => handleComment(index, blog._id)} />
                        <div className="ml-1">{blog.comments}</div>
                      </div>
                      <div
                        className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full relative`}>
                        <GoShare size={24} onClick={() => handleShareBlog(blog._id)} />
                        <div className="ml-1">{blog.share}</div>
                        {isCopyLink === blog._id && (
                          <div className="absolute top-[20px] p-2 w-[100px] mt-1 rounded-md text-sm bg-white text-black">
                            Copied Link
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* thumbnail */}
                  <div onClick={() => handleLink(`/blog/${blog._id}`)} className="w-1/4 ">
                    <img
                      src={blog.thumbnail}
                      alt="thumbnail"
                      className="max-w-[100%] max-h-[200px] h-100 h-auto m-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Comment */}
              <div id={blog._id} className="ml-2 mr-6 pl-4">
                {openComments === index && <Comment idBlog={blog._id} comments={comments} />}
              </div>

              {/* Report blog */}
              <div>
                {isReport === blog._id && (
                  <ModalReportBlog blog={blog} handleShowReport={handleShowReport} />
                )}

                {modalDeleteBlog !== -1 && (
                  <ModalDeleteBlog
                    themeColor={themeColor}
                    token={token}
                    dispatch={dispatch}
                    idBlog={modalDeleteBlog}
                    handleOpen={handleDeleteBlog}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Blog2;
