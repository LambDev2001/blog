import React from "react";
import Button from "../theme/button/Button";

const DeleteModal = ({ handleDelete, closeModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center z-[99999]">
      <div className="bg-white w-96 h-[200px] p-6 rounded-lg shadow-md">
        <p className="text-xl font-semibold mb-4">Confirm Deletion</p>
        <p className="mb-4">
          Are you sure you want to delete this item? This action cannot be undo.
        </p>
        <div className="flex justify-end">
          <Button text={"Cancel"} color={2} onClick={closeModal} />
          <Button text={"Delete"} color={0} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
