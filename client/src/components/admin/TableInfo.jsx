import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../global/Pagination";


const TableInfo = ({ data }) => {
  
  const history = useHistory();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("account");
  
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
    <div className="m-2 bg-white border-element rounded overflow-hidden">
      <table className="w-full table-fixed">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="w-1/6 py-3 cursor-pointer">
              Avatar
            </th>
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("account")}>
              Account
            </th>
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("username")}>
              Username
            </th>
            <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("status")}>
              Status
            </th>
            {/* <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort("report.length")}>
              Report
            </th> */}
            <th className="w-1/6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((result, index) => (
            <tr
              className="border-b border-gray-300 hover:bg-gray-100 transition-all duration-300"
              key={index}>
              <td className="py-2">
                <img src={result.avatar} className="w-12 h-12 rounded-full mx-auto" alt="" />
              </td>
              <td className="py-2">{result.account}</td>
              <td className="py-2 font-semibold">{result.username}</td>
              <td className="py-2">
                <span
                  className={`text-${
                    result.status === "active" ? "green" : "red"
                  }-500 font-semibold`}>
                  {result.status}
                </span>
              </td>
              {/* <td className="py-2">{result.report.length}</td> */}
              <td className="py-2">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="h-[30px] mx-3 cursor-pointer"
                  style={{ marginLeft: "auto" }}
                  onClick={() => history.push(`/admin/user/${result._id}`)}
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
