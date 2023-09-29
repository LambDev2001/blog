import React from "react";
import { useSelector } from "react-redux";

const Comment = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const comments = useSelector((state) => state.commentReducer);

  return (
    <div className={`${themeColor.sub} mx-4 my-2 rounded-lg p-3`}>
      {comments.length > 0 && comments.map((comment, index) => (
        <div className="flex my-2">
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

            {/* Time */}
            <div>{comment.updatedAt}</div>
          </div>
        </div>
      ))}

      
    </div>
  );
};

export default Comment;
