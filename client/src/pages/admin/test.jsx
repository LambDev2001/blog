import React from "react";

const test = () => {
  return (
    <div className="my-container">
      <div className="group block bg-white">
        <div className="">
          <div className="flex items-center space-x-">
            <h3 className="text-slate-900 group-hover:text-red-600 text-sm font-semibold">
              New project
            </h3>
          </div>
          <p className="text-slate-500 group-hover:text-gray-900 text-sm">
            Create a new project from a variety of starting templates.
          </p>
          <div className="hover:opacity-1" style={{opacity: 0}}>test</div>
        </div>
      </div>
    </div>
  );
};

export default test;
