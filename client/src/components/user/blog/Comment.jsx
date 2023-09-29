import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BsSend } from "react-icons/bs";

import { sendComment } from "../../../redux/actions/commentAction";

const Comment = ({idBlog=""}) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.accessToken);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const comments = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch()

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendComment({comment, idBlog, token}));
    setComment("");
  };

  return (
    <div className={`${themeColor.sub} mx-4 my-2 rounded-lg p-3`}>
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index} className="flex my-2">
            {/* Avatar */}
            <img
              src={comment.author.avatar}
              alt="avatar"
              className="rounded-circle h-[32px] w-[32px] my-2"
            />

            {/* info */}
            <div className="ml-2">
              <div className={`${themeColor.input} p-2 rounded-lg`}>
                <div className="font-bold">{comment.author.username}</div>
                <div>{comment.message}</div>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <div>{comment.timeAgo}</div>
                <div className="font-semibold cursor-pointer mr-1">Reply</div>
              </div>
            </div>
          </div>
        ))}

      {/* create comment */}
      <form onSubmit={(e) => handleSubmit(e)} onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} className={`${themeColor.sub} w-100 flex mt-3 `}>
        <img src={user.avatar} alt="" className="rounded-full w-[32px] h-[32px]" />
        <textarea
          type="text"
          name="comment"
          onChange={(e) => handleComment(e)}
          className={`${themeColor.input}  text-white py-2 px-3 ml-2 w-100 rounded-lg shadow appearance-none leading-tight focus:outline-none`}
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-full mx-2 h-[32px]">
          <BsSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default Comment;
