import React from "react";

const ModalDissolutionRoom = ({ themeColor, handleOpenDissolution, slug }) => {

  const handleDeleteRoom = () => {
    
  }

  return (
    <div
      className="fixed inset-0 flex justify-center z-[99999]"
      style={{ backgroundColor: "rgba(179, 193, 159, 0.29)" }}>
      <div
        className={`${themeColor.main} ${themeColor.border} border-1 w-96 h-[220px] p-6 rounded-lg shadow-md`}>
        <p className="text-xl font-semibold mb-4">Dissolution Room</p>
        <div>
          Are you sura dissolution this room? Data in this room may be can't restore after you click
          "Yes" button below.
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button onClick={handleOpenDissolution} className={`bg-gray-600 mx-1 text-white px-3 py-2 rounded`}>
          Cancel
        </button>
        <button className="bg-red-500 mx-1 text-white px-3 py-2 rounded" onClick={handleDeleteRoom}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ModalDissolutionRoom;
