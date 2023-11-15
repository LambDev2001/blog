import React from "react";
import { BsSend } from "react-icons/bs";

const InputComment = ({
  themeColor,
  comment,
  handleSubmit,
  handleComment,
  user,
  idComment = "",
}) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, idComment)}
      onKeyDown={(e) => e.key === "Enter" && handleSubmit(e, idComment)}
      className={`${themeColor.sub} ${themeColor.text} flex mt-3 mr-3`}>
      <img src={user.avatar} alt="" className="rounded-full w-[32px] h-[32px]" />
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={(e) => handleComment(e)}
        className={`${themeColor.input} py-2 px-3 ml-2 w-100 rounded-lg shadow appearance-none leading-tight focus:outline-none`}
        placeholder="Write a comment..."
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-full mx-2 h-[32px]">
        <BsSend size={18} />
      </button>
    </form>
  );
};

export default InputComment;
