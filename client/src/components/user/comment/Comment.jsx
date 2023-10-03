import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LuMoreHorizontal } from "react-icons/lu";

import { sendComment, getReply, sendReply } from "../../../redux/actions/commentAction";
import InputComment from "./InputComment";
import ModalReportComment from "../modal/ModalReportComment";

const Comment = ({ idBlog, comments, idComment = "" }) => {
  const [contentComment, setContentComment] = useState("");
  const [isReply, setIsReply] = useState(-1);
  const [isMore, setIsMore] = useState(-1);
  const [isReport, setIsReport] = useState({});
  const token = useSelector((state) => state.authReducer.accessToken);
  const user = useSelector((state) => state.authReducer.user);
  const themeColor = useSelector((state) => state.themeUserReducer);

  const dispatch = useDispatch();

  const handleComment = (e) => {
    const { value } = e.target;
    setContentComment(value);
  };

  const handleReply = async (index, idComment) => {
    if (isReply === index) {
      setIsReply(-1);
    } else {
      await dispatch(getReply(idComment, token));
      setIsReply(index);
    }
  };

  const handleMore = (index) => {
    if (isMore === index) {
      setIsMore(-1);
    } else {
      setIsMore(index);
    }
  };

  const handleOpenReport = (index) => {
    setIsMore(-1);
    setIsReport(index);
  };

  const handleSubmit = async (e, idComment) => {
    e.preventDefault();

    if (idComment === "") {
      dispatch(sendComment({ comment: contentComment, idBlog, token }));
    } else {
      await dispatch(sendReply({ comment: contentComment, idBlog, idComment, token }));
      dispatch(getReply(idComment, token));
    }
    setContentComment("");
  };

  return (
    <div className={`${themeColor.sub} rounded-lg pt-2 pb-3 pl-4 `}>
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index}>
            <div>
              {/* comment parent */}
              <div className="my-2 flex">
                {/* Avatar */}
                <img
                  src={comment.author.avatar}
                  alt="avatar"
                  className="rounded-circle h-[32px] w-[32px] my-2"
                />

                {/* Info comment */}
                <div>
                  {/* info */}
                  <div className="ml-2 relative">
                    <div className={`${themeColor.input} p-2 rounded-lg max-w-prose`}>
                      <div className="font-bold">{comment.author.username}</div>
                      <div className="block">{comment.message}</div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <div
                        className="font-semibold cursor-pointer mr-2"
                        onClick={() => handleReply(index, comment._id)}>
                        Reply
                      </div>
                      <div>{comment.timeAgo}</div>
                    </div>
                  </div>

                  {isReply !== index && comment.countReply > 0 && (
                    <div
                      className="ml-2 mt-1 text-gray-400"
                      onClick={() => handleReply(index, comment._id)}>
                      {comment.countReply} Reply
                    </div>
                  )}
                </div>

                {/* more */}
                <div className="mx-3 ">
                  <div
                    className={`${isMore === index && themeColor.input} ${
                      themeColor.hover
                    } mb-auto rounded-full p-2 cursor-pointer`}
                    onClick={() => handleMore(index)}>
                    <LuMoreHorizontal size={16} />
                  </div>
                  <div className={`${themeColor.input} relative mt-1`}>
                    {/* modal more */}
                    {isMore === index && (
                      <div
                        className={`${themeColor.input} absolute top-0 left-0 rounded-lg p-2 cursor-pointer`}
                        onClick={() => handleOpenReport(index)}>
                        Report
                      </div>
                    )}

                    {/* modal report */}
                    {isReport === index && (
                      <ModalReportComment comment={comment} handleIsModal={handleOpenReport} />
                    )}
                  </div>
                </div>
              </div>

              {/* reply */}
              {isReply === index && (
                <Comment idBlog={idBlog} comments={comment.replies} idComment={comment._id} />
              )}
            </div>
          </div>
        ))}
      {/* send comment */}
      <div className="w-100 flex-grow">
        <InputComment
          idComment={idComment}
          user={user}
          themeColor={themeColor}
          handleSubmit={handleSubmit}
          handleComment={handleComment}
          comment={contentComment}
        />
      </div>
    </div>
  );
};

export default Comment;
