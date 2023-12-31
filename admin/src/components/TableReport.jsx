import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import Pagination from "./global/Pagination";

const TableInfo = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("updateAt");
  const color = useSelector((state) => state.themeReducer.themeColor);
  const history = useHistory();
  const itemsPerPage = 8;

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
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("account")}>
              Sender
            </th>
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("username")}>
              Type
            </th>
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("status")}>
              Content
            </th>
            <th className="w-1/6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((result, index) => (
            <tr className="border-b hover:bg-gray-200 transition-all duration-300" key={index}>
              <td className="py-2">{result.author}</td>
              <td className="py-2 font-semibold">{result.type}</td>
              <td className="py-2 text-left">{result.content}</td>
              <td className="py-2">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="h-[30px] mx-3 cursor-pointer"
                  style={{ marginLeft: "auto" }}
                  onClick={() => history.push(`/report/${result._id}`)}
                />
              </td>
            </tr>
          ))}
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

export default TableInfo;
