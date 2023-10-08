import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { GrShare } from "react-icons/gr";

import AdminRouteWrapper from "../utils/AdminRouteWrapper";
import Pagination from "../components/global/Pagination";
import Header from "../components/global/Header";
import Search from "../components/global/Search";
import Menu from "../components/Menu";
import { getBlogs } from "../redux/actions/blogAction";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusBlogs, setStatusBlogs] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");
  const token = useSelector((state) => state.authReducer.accessToken);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const blogs = useSelector((state) => state.blogReducer);
  const [sortedData, setSortedData] = useState([]);
  const [dataBlogs, setDataBlogs] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const colorStatus = [
    "rgba(240, 240, 240, 0.8)",
    "rgba(85, 230, 86, 0.8)",
    "rgba(255, 235, 59, 0.8)",
    "rgba(255, 99, 71, 0.8)",
  ];

  useEffect(() => {
    dispatch(getBlogs(token));
  }, [dispatch, token]);

  useEffect(() => {
    setDataBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    if (sortField && dataBlogs.length >= 0 && blogs) {
      const sorted = [...dataBlogs].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] < b[sortField] ? -1 : 1;
        } else {
          return a[sortField] > b[sortField] ? -1 : 1;
        }
      });
      setSortedData(sorted);
    }
  }, [blogs, dataBlogs, sortOrder, sortField]);

  const sortStatus = (status) => {
    setStatusBlogs(status);
    if (status === "all") {
      setDataBlogs(blogs);
    } else {
      setDataBlogs(
        blogs.filter((blog) => {
          return blog.status === status;
        })
      );
    }
  };

  // Calculate the index of the first and last item to display
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
    <div className="d-flex">
      <Menu />
      <div className="w-100">
        <div className="mx-2">
          <AdminRouteWrapper />
          <Header content="Manager Blogs" />
          <Search data={dataBlogs} type={"blog"} />

          {/* filter status */}
          <div className={`flex mt-1`}>
            <div
              className={`${
                statusBlogs === "all" ? color.active : color.inside
              } py-2 px-4 mx-2 rounded-md shadow-lg cursor-pointer`}
              onClick={() => sortStatus("all")}>
              All
            </div>
            <div
              className={`${
                statusBlogs === "waiting" ? color.active : color.inside
              } py-2 px-4 mx-2 rounded-md shadow-lg cursor-pointer`}
              onClick={() => sortStatus("waiting")}>
              Waiting
            </div>
            <div
              className={`${
                statusBlogs === "hidden" ? color.active : color.inside
              } py-2 px-4 mx-2 rounded-md shadow-lg cursor-pointer`}
              onClick={() => sortStatus("hidden")}>
              Hidden
            </div>
          </div>
          <div className={`${color.outside} p-1 rounded-lg overflow-hidden`}>
            <table className="w-full bg-white table-fixed rounded-lg overflow-hidden">
              <thead className={`${color.active}`}>
                <tr className="text-center">
                  <th className="w-1/7 py-3 cursor-pointer" onClick={() => handleSort("title")}>
                    Title
                  </th>
                  <th className="w-1/7 py-3 cursor-pointer" onClick={() => handleSort("thumbnail")}>
                    Thumbnail
                  </th>
                  <th
                    className="w-2/6 py-3 cursor-pointer"
                    onClick={() => handleSort("description")}>
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
                    onClick={() => history.push(`/blog/${result._id}`)}>
                    <td className="px-3 py-2">{result.title}</td>
                    <td className="px-3 py-2">
                      <img
                        className="max-h-[80px] max-w-[100%] m-auto"
                        src={result.thumbnail}
                        alt=""
                      />
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
      </div>
    </div>
  );
};

export default Blogs;
