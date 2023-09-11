import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4 absolute m-3 bottom-0 left-1/2 translate-x-[-50%]">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => onPageChange(number)}
            className={`cursor-pointer px-4 py-2 rounded ${
              currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
