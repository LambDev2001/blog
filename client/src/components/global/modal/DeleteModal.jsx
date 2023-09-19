import React from "react";

const DeleteModal = ({ handleDelete, closeModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center z-[99999]">
      <div className="bg-white w-96 h-[200px] p-6 rounded-lg shadow-md">
        <p className="text-xl font-semibold mb-4">Confirm Deletion</p>
        <p className="mb-4">
          Are you sure you want to delete this item? This action cannot be undo.
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
