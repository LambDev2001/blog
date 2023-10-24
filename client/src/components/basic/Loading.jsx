import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-900 h-16 w-16"></div>
    </div>
  );
};

export default Loading;
