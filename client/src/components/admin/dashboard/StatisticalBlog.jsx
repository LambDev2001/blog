import React from "react";
import { FaTags, FaEye, FaFileAlt, FaUser } from "react-icons/fa";
import { LuFileWarning } from "react-icons/lu";

const AdminDashboard = ({ data }) => {
  return (
    <div className="flex flex-col p-4 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-5 gap-4">
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
          <div className="flex">
            <FaFileAlt className="text-3xl mb-2" />
            <p className="text-2xl font-bold mb-2 ml-3">{data.blogs}</p>
          </div>
          <h3 className="text-lg font-semibold mb-2">Total Blogs</h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
          <div className="flex">
            <FaTags className="text-3xl mb-2" />
            <p className="text-2xl font-bold mb-2 ml-3">{data.categories}</p>
          </div>
          <h3 className="text-lg font-semibold mb-2">Total Categories</h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
          <div className="flex">
            <FaEye className="text-3xl mb-2" />
            <p className="text-2xl font-bold mb-2 ml-3">{data.views}</p>
          </div>
          <h3 className="text-lg font-semibold mb-2">Total Views</h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
          <div className="flex">
            <LuFileWarning className="text-3xl mb-2" />
            <p className="text-2xl font-bold mb-2 ml-3">{data.reports}</p>
          </div>
          <h3 className="text-lg font-semibold mb-2">Total Reports</h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
          <div className="flex">
            <FaUser className="text-3xl mb-2" />
            <p className="text-2xl font-bold mb-2 ml-3">{data.users}</p>
          </div>
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
