import React from "react";

import { deleteBlog } from "../../redux/actions/blogAction";

const ModalDeleteBlog = ({ themeColor, token, dispatch, handleOpen, idBlog }) => {
  const handleDeleteBlog = () => {
    dispatch(deleteBlog(idBlog, token));
    handleOpen(idBlog);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center z-[99999]"
      style={{ backgroundColor: "rgba(179, 193, 159, 0.29)", opacity: "0.5" }}>
      
      <div
        className={`${themeColor.main} ${themeColor.border} border-1 w-96 h-[200px] p-6 rounded-lg shadow-md`}>
        <p className="text-xl font-semibold mb-4">Confirm Deletion</p>
        <p>Are you sure you want to delete this item? This action cannot be undo.</p>

        {/* Button  */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => handleOpen(idBlog)}
            className={`bg-gray-600 mx-1 text-white px-3 py-2 rounded`}>
            Cancel
          </button>
          <button
            className="bg-red-500 mx-1 text-white px-3 py-2 rounded"
            onClick={handleDeleteBlog}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteBlog;
