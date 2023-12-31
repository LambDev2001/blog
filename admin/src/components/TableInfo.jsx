import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaCircleUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

import Pagination from "./global/Pagination";
import ModalSendCustomMail from "./modal/ModalSendCustomMail";

const TableInfo = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("createdAt");
  const [toSendMail, setToSendMail] = useState(null);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const token = useSelector((state) => state.authReducer.accessToken);
  const history = useHistory();
  const itemsPerPage = 6;

  const colorStatus = [
    "rgba(240, 240, 240, 0.8)",
    "rgba(85, 230, 86, 0.8)",
    "rgba(255, 235, 59, 0.8)",
    "rgba(255, 99, 71, 0.8)",
  ];

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

  const handleSendMail = (to) => {
    setToSendMail(to);
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
            <tr className="border-b hover:bg-gray-200 transition-all duration-300" key={index}>
              <td className="py-2">
                <img src={result.avatar} className="w-12 h-12 rounded-full mx-auto" alt="" />
              </td>
              <td className="py-2">{result.account}</td>
              <td className="py-2 font-semibold">{result.username}</td>
              <td className="py-2">
                <div
                  className="text-gray-600 rounded text-center w-[50px] p-1 m-auto"
                  style={{
                    backgroundColor: `${colorStatus[result.status]}`,
                  }}>
                  {result.status}
                </div>
              </td>
              {/* <td className="py-2">{result.report.length}</td> */}
              <td className="py-2 ">
                <div className="flex items-center justify-around w-100">
                  <div></div>
                  <div></div>
                  <IoMail
                    size={30}
                    className=" cursor-pointer"
                    onClick={() => handleSendMail(result.account)}
                  />
                  <FaCircleUser
                    size={30}
                    className=" cursor-pointer"
                    onClick={() => history.push(`/user/${result._id}`)}
                  />
                  <div></div>
                  <div></div>
                </div>
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
      {toSendMail && (
        <ModalSendCustomMail to={toSendMail} token={token} handleOpen={setToSendMail} />
      )}
    </div>
  );
};

export default TableInfo;
