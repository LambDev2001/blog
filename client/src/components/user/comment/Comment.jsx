import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendComment, getReply, sendReply } from "../../../redux/actions/commentAction";
import InputComment from "./InputComment";

const Comment = ({ idBlog }) => {
  const [comment, setComment] = useState("");
  const [isReply, setIsReply] = useState(-1);
  const token = useSelector((state) => state.authReducer.accessToken);
  const user = useSelector((state) => state.authReducer.user);
  const comments = useSelector((state) => state.commentReducer);
  // const replies = useSelector((state) => state.replyReducer);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const dispatch = useDispatch();

  const handleGetReply = (idComment, index) => {
    dispatch(getReply(idComment, token));
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleReply = (index) => {
    if (isReply === index) setIsReply(-1);
    else {
      setIsReply(index);
      handleGetReply(comment._id, index);
    }
  };

  const handleSubmit = (e, idComment) => {
    e.preventDefault();

    if (idComment === "") dispatch(sendComment({ comment, idBlog, token }));
    else dispatch(sendReply({ comment, idBlog, idComment, token }));
    setComment("");
  };

  return (
    <div className={`${themeColor.sub} mx-4 my-2 rounded-lg p-3`}>
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index} className="my-2">
            <div className="flex">
              {/* Avatar */}
              <img
                src={comment.author.avatar}
                alt="avatar"
                className="rounded-circle h-[32px] w-[32px] my-2"
              />
              <div>
                {/* info */}
                <div className="ml-2">
                  <div className={`${themeColor.input} p-2 rounded-lg`}>
                    <div className="font-bold">{comment.author.username}</div>
                    <div>{comment.message}</div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <div
                      className="font-semibold cursor-pointer mr-2"
                      onClick={() => handleReply(index)}>
                      Reply
                    </div>
                    <div>{comment.timeAgo}</div>
                  </div>
                </div>
                {isReply !== index && comment.countReply > 0 && (
                  <div
                    className="ml-2 mt-2 text-gray-400"
                    onClick={() => handleGetReply(comment._id, index)}>
                    {comment.countReply} Reply
                  </div>
                )}

                {/* send reply */}
                {isReply === index && (
                  <InputComment
                    idComment={comment._id}
                    user={user}
                    themeColor={themeColor}
                    handleSubmit={handleSubmit}
                    handleComment={handleComment}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

      {/* send comment */}
      <InputComment
        idComment={""}
        user={user}
        themeColor={themeColor}
        handleSubmit={handleSubmit}
        handleComment={handleComment}
      />
    </div>
  );
};

export default Comment;
