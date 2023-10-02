import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reportComment } from "../../../redux/actions/commentAction";

const ModalReportComment = ({ comment, handleIsModal }) => {
  const [content, setContent] = useState("");
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  const handleContent = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const handleReport = (e) => {
    e.preventDefault();
    dispatch(reportComment({ comment, content, token }));
    handleIsModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <form
        className={`${themeColor.main} p-4 rounded-lg shadow-lg w-[500px]`}
        onSubmit={(e) => handleReport(e)}>
        <div className="text-2xl font-semibold">Report Comment</div>

        {/* info */}
        <div className="flex justify-center mt-2 rounded-lg shadow-md overflow-hidden">
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
                  <div>{comment.timeAgo}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* content report */}
        <div className={` my-2`}>
          <div className="text-md font-bold my-1">Reason for report</div>
          <textarea
            className={`${themeColor.sub} w-full rounded-lg active:border-none`}
            name="content"
            rows="5"
            placeholder=" Write your reason for report here"
            onChange={(e) => handleContent(e)}></textarea>
        </div>

        {/* button */}
        <div className="flex justify-end">
          <button
            className="mx-2 py-2 px-3 text-white bg-red-500 hover:bg-red-600 rounded-lg"
            onClick={() => handleIsModal()}>
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 py-2 px-3 text-white bg-green-500 hover:bg-green-600 rounded-lg">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalReportComment;
