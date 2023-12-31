import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BiLike, BiDislike, BiSolidLike, BiSolidDislike, BiCommentDetail } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { GoShare } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { MdOutlineBugReport } from "react-icons/md";

import Comment from "../comment/Comment";
import ModalReportBlog from "../modal/ModalReportBlog";
import {
  dislikeBlog,
  likeBlog,
  increaseShare,
  removeBlog,
} from "../../redux/actions/blogAction";
import { followUser } from "../../redux/actions/userAction";
import { getComments } from "../../redux/actions/commentAction";

const Blogs2 = () => {
  const [openComments, setOpenComments] = useState(-1);
  const [isReport, setIsReport] = useState(null);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const blogs = useSelector((state) => state.blogReducer);
  const comments = useSelector((state) => state.commentReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  const handleLike = (id) => {
    dispatch(likeBlog(id, token));
  };

  const handleDislike = (id) => {
    dispatch(dislikeBlog(id, token));
  };

  const handleFollow = (idUser) => {
    dispatch(followUser(idUser, token));
  };

  const handleShare = (idBlog) => {
    dispatch(increaseShare(idBlog, token));
  };

  const handleComment = (index, idBlog) => {
    if (openComments !== index) {
      dispatch(getComments(idBlog));
      setOpenComments(index);
    } else {
      setOpenComments(-1);
    }
  };

  const handleShowReport = (idBlog) => {
    if (isReport === idBlog || idBlog === null) setIsReport(null);
    else setIsReport(idBlog);
  };

  const handleRemoveBlog = async (idBlog) => {
    dispatch(removeBlog(idBlog));
  };

  return (
    <div>
      {blogs.length > 0 &&
        blogs.map((blog, index) => {
          if (blog.isRemove === true) return <div></div>;

          return (
            <div key={index}>
              {/* Blog */}
              <div className={`${themeColor.sub} mx-4 my-3 rounded-lg p-3`}>
                {/* header */}
                <div className="flex justify-between">
                  {/* start */}
                  <div className="flex">
                    <div className="flex align-items-center">
                      <Link to={"/profile/" + blog.author._id} className="flex">
                        <img
                          src={blog.author.avatar}
                          alt="thumbnail"
                          className="h-[28px] w-[28px] rounded-circle"
                        />
                        <div className="mx-1">{blog.author.username}</div>
                      </Link>
                      <div className="mx-2">{blog.timeAgo}</div>
                    </div>

                    <div className={`${themeColor.input} mx-2 px-3 py-2 rounded-full `}>
                      {blog.category}
                    </div>
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
                      <MdOutlineBugReport
                        color="white"
                        size={24}
                        className="mx-1 cursor-pointer"
                        onClick={() => handleShowReport(blog._id)}
                      />
                      <IoMdClose
                        color="white"
                        size={24}
                        className="mx-1 cursor-pointer"
                        onClick={() => handleRemoveBlog(blog._id)}
                      />
                    </div>
                  </div>
                </div>

                {/* description, interact and thumbnail */}
                <div className="flex flex-wrap justify-between">
                  <div className="w-3/4">
                    {/* title */}
                    <div className="my-1 text-lg font-bold">{blog.title}</div>

                    {/* description */}
                    <div className="my-1 text-md">{blog.description}</div>
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
                        className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                        <GoShare size={24} onClick={() => handleShare(blog._id)} />
                        <div className="ml-1">{blog.share}</div>
                      </div>
                    </div>
                  </div>

                  {/* thumbnail */}
                  <Link to={"/blog/" + blog._id} className="w-1/4 max-w-[200px] h-100">
                    <img src={blog.thumbnail} alt="thumbnail" className="w-100 rounded-md" />
                  </Link>
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
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Blogs2;
