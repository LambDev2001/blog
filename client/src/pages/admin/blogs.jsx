import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GrShare } from "react-icons/gr";
import Pagination from "../../components/global/Pagination";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import Header from "../../components/global/Header";
import Search from "../../components/global/Search";
import { getBlogs } from "../../redux/actions/blogAction";
import { useHistory } from "react-router-dom";

const Blogs = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const dispatch = useDispatch();
  const history = useHistory();
  const colorStatus = [
    "rgba(240, 240, 240, 0.8)",
    "rgba(85, 230, 86, 0.8)",
    "rgba(255, 235, 59, 0.8)",
    "rgba(255, 99, 71, 0.8)",
  ];

  useEffect(() => {
    dispatch(getBlogs(token));
  }, [dispatch, token]);

  const blogs = useSelector((state) => state.blogReducer);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");

  useEffect(() => {
    if (sortField && blogs.length > 1) {
      const sorted = [...blogs].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] < b[sortField] ? -1 : 1;
        } else {
          return a[sortField] > b[sortField] ? -1 : 1;
        }
      });
      setSortedData(sorted);
    }
  }, [blogs, sortOrder, sortField]);

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
    <div className="mx-2">
      <AdminRouteWrapper />
      <Header />
      <Search data={blogs} type={"blog"} />
      <div className={`${color.outside} my-2 p-1 rounded-lg overflow-hidden`}>
        <table className="w-full bg-white table-fixed rounded-lg overflow-hidden">
          <thead className={`${color.active}`}>
            <tr className="text-center">
              <th className="w-1/7 py-3 cursor-pointer" onClick={() => handleSort("title")}>
                Title
              </th>
              <th className="w-1/7 py-3 cursor-pointer" onClick={() => handleSort("thumbnail")}>
                Thumbnail
              </th>
              <th className="w-2/6 py-3 cursor-pointer" onClick={() => handleSort("description")}>
                Description
              </th>
              <th className="w-1/7 py-3 cursor-pointer" onClick={() => handleSort("status")}>
                Status
              </th>
              <th className="w-1/7 py-3 cursor-pointer" onClick={() => handleSort("date")}>
                Date update
              </th>
              <th className="w-1/7 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {currentItems.map((result, index) => (
              <tr
                key={index}
                className="border-t border-gray-300 hover:bg-gray-200 transition-all duration-300"
                onClick={() => history.push(`/admin/blog/${result._id}`)}>
                <td className="px-3 py-2">{result.title}</td>
                <td className="px-3 py-2">
                  <img className="max-h-[80px] max-w-[100%] m-auto" src={result.thumbnail} alt="" />
                </td>
                <td className="text-start">{result.description.substring(0, 100)}</td>
                <td className="px-3 py-2">
                  <div
                    className="text-gray-600 m-auto rounded text-center border-element w-[70px] p-1"
                    style={{
                      backgroundColor: `${
                        result.status === "normal" ? colorStatus[1] : colorStatus[2]
                      }`,
                    }}>
                    {result.status}
                  </div>
                </td>
                <td className="px-3 py-2">{result.updatedAt}</td>
                <td className="px-3 py-2">
                  <GrShare className="cursor-pointer m-auto" size={30} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
    // <div className="d-flex flex-wrap">
    //   <AdminRouteWrapper />
    //   <Header />
    //   <div className="p-4 flex-1">
    //     <button
    //       className={`${sheet === "all" ? "bg-gray-200" : ""} px-2 py-1 mr-2 rounded`}
    //       onClick={() => setSheet("all")}>
    //       All
    //     </button>
    //     <button
    //       className={`${sheet === "waiting" ? "bg-gray-200" : ""} px-2 py-1 rounded`}
    //       onClick={() => setSheet("waiting")}>
    //       Waiting
    //     </button>
    //     <table className="min-w-full border border-gray-300">
    //       <thead>
    //         <tr className="bg-gray-200">
    //           <th className="px-4 py-2">#</th>
    //           <th className="px-4 py-2">Title</th>
    //           <th className="px-4 py-2">Thumbnail</th>
    //           <th className="px-4 py-2">Status</th>
    //           <th className="px-4 py-2" onClick={toggleSortOrder}>
    //             Updated At
    //             {sortOrder === "asc" ? "▲" : "▼"}
    //           </th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {sortedData.length > 0 &&
    //           sortedData.map((item, index) => (
    //             <tr
    //               key={index}
    //               className="border-t border-gray-300"
    //               onClick={() => history.push(`/blog/${result._id}`)}>
    //               <td className="px-4 py-2">{index + 1}</td>
    //               <td className="px-4 py-2">{result.title}</td>
    //               <td className="px-4 py-2">
    //                 <img className="h-[80px]" src={result.thumbnail} alt="" />
    //               </td>
    //               <td className="px-4 py-2">
    //                 <select
    //                   value={result.status}
    //                   className="p-1 border border-gray-300 rounded"
    //                   onClick={(e) => e.stopPropagation()}
    //                   onChange={(e) => {
    //                     handleUpdate(item, e.target.value);
    //                   }}>
    //                   <option value="normal">Normal</option>
    //                   <option value="hidden">Hidden</option>
    //                   <option value="waiting">Waiting</option>
    //                 </select>
    //               </td>
    //               <td className="px-4 py-2">{result.updatedAt}</td>
    //               <td className="px-4 py-2">
    //                 <AiOutlineDelete
    //                   onClick={(e) => {
    //                     e.stopPropagation();
    //                     handleDelete(result._id);
    //                   }}
    //                 />
    //               </td>
    //             </tr>
    //           ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default Blogs;
