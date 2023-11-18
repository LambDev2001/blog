import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaRegTrashCan } from "react-icons/fa6";

import Pagination from "./global/Pagination";

const TablePermit = ({ data, handleDeletePermit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("createdAt");
  const color = useSelector((state) => state.themeReducer.themeColor);
  const itemsPerPage = 6;

  useEffect(() => {
    if (sortField) {
      const sorted = [...data].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] < b[sortField] ? -1 : 1;
        } else {
          return a[sortField] > b[sortField] ? -1 : 1;
        }
      });
      setSortedData(sorted);
    }
  }, [data, sortOrder, sortField]);

  // Calculate the index of the first and last item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Update handleSort to set the sorting field
  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortField(field); // Set the sorting field
  };

  return (
    <div className={`${color.outside} my-2 p-1 rounded-lg overflow-hidden`}>
      <table className="w-full bg-white table-fixed rounded-lg overflow-hidden">
        <thead className={`${color.active}`}>
          <tr className="text-center">
            <th className="w-1/6 py-3 cursor-pointer">Avatar</th>
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("account")}>
              Account
            </th>
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("username")}>
              Username
            </th>
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("createdAt")}>
              Day create
            </th>

            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("status")}>
              status
            </th>

            <th className="w-1/6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((result, index) => {
            const date = new Date(result.createdAt);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            return (
              <tr className="border-b hover:bg-gray-200 transition-all duration-300" key={index}>
                <td className="py-2">
                  <img src={result.avatar} className="w-12 h-12 rounded-full mx-auto" alt="" />
                </td>
                <td className="py-2">{result.account}</td>
                <td className="py-2 font-semibold">{result.username}</td>
                <td className="py-2">{formattedDate}</td>
                <td className="py-2">{result.status}</td>
                <td className="py-2">
                  <FaRegTrashCan
                    size={30}
                    className="mx-auto cursor-pointer"
                    style={{ marginLeft: "auto" }}
                    onClick={() => handleDeletePermit(result._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TablePermit;
