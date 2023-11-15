import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LuMoreHorizontal } from "react-icons/lu";

import InputComment from "./InputComment";
import ModalReportComment from "../modal/ModalReportComment";

import { sendComment, getReply, sendReply, deleteComment } from "../../redux/actions/commentAction";
import SocketContext from "../../utils/SocketContext";

const Comment = ({ idBlog, comments, idComment = "" }) => {
  const [contentComment, setContentComment] = useState("");
  const [isReply, setIsReply] = useState(-1);
  const [isMore, setIsMore] = useState(-1);
  const [isReport, setIsReport] = useState({});
  const token = useSelector((state) => state.authReducer.accessToken);
  const user = useSelector((state) => state.authReducer.user);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const socket = useContext(SocketContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", idBlog);
    }
  }, [idBlog, socket]);

  useEffect(() => {
    socket.on("create-comment", (data) => {
      dispatch({ type: "SEND_COMMENT", payload: data });
    });

    socket.on("reply-comment", (idComment) => {
      // await dispatch({ type: "SEND_REPLY", payload: { idComment: idComment, data } });
      dispatch(getReply(idComment, token));
    });
  }, [dispatch, socket, idBlog, token]);

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
    if (contentComment === "") return;
    if (idComment === "") {
      sendComment({ comment: contentComment, idBlog, token });
    } else {
      await dispatch(sendReply({ comment: contentComment, idBlog, idComment, token }));
      dispatch(getReply(idComment, token));
    }
    setContentComment("");
  };

  const handleDeleteComment = (idComment) => {
    dispatch(deleteComment(idComment, token));
    setIsMore(-1);
  };

  return (
    <div
      className={`${themeColor.sub} ${themeColor.text} ${themeColor.border} border-1 rounded-md shadow-md pt-2 pb-3 pl-4 `}>
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
                      className="ml-2 mt-1 text-gray-400 cursor-pointer"
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
                        className={`${themeColor.input} ${themeColor.border} border-1 absolute top-0 left-0 rounded-lg p-1 z-20`}>
                        <div
                          className={`${themeColor.main} ${themeColor.hoverBold} rounded-lg py-2 px-3 cursor-pointer my-1`}
                          onClick={() => handleOpenReport(index)}>
                          Report
                        </div>
                        {user._id === comment.author._id && (
                          <div
                            className={`${themeColor.main} ${themeColor.hoverBold} rounded-lg py-2 px-3 cursor-pointer my-1`}
                            onClick={() => handleDeleteComment(comment._id)}>
                            Delete
                          </div>
                        )}
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
