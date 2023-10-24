import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReply } from "../../redux/actions/commentAction";

const Comment = ({ idBlog, comments, idComment = "", idReport }) => {
  const [isReply, setIsReply] = useState(-1);
  const token = useSelector((state) => state.authReducer.accessToken);
  const color = useSelector((state) => state.themeReducer.themeColor);

  const dispatch = useDispatch();

  const handleReply = async (index, idComment) => {
    if (isReply === index) {
      setIsReply(-1);
    } else {
      await dispatch(getReply(idComment, token));
      setIsReply(index);
    }
  };

  return (
    <div className={`${color.outside} rounded-lg pt-2 pb-3 pl-4 `}>
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index}>
            <div>
              {/* comment parent */}
              <div className={`${comment._id === idReport && "bg-red-300 p-1 rounded-md"} my-2 flex`}>
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
                    <div className={`${color.inside} p-2 rounded-lg max-w-prose`}>
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
              </div>

              {/* reply */}
              {isReply === index && (
                <Comment
                  idBlog={idBlog}
                  comments={comment.replies}
                  idComment={comment._id}
                  idReport={idReport}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comment;
