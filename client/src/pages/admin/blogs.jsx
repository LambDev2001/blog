import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import { AiOutlineDelete } from "react-icons/ai";
import { getBlogs, updateBlogStatus, deleteBlog } from "../../redux/actions/blogAction";
import { useHistory } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);
  const history = useHistory();
  const [sheet, setSheet] = useState("all");

  useEffect(() => {
    dispatch(getBlogs(token));
  }, [dispatch, token]);

  const blogs = useSelector((state) => state.blogReducer);
  const [sortedData, setSortedData] = useState(blogs);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setSortedData(blogs);
  }, [blogs]);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    const sorted = [...sortedData].sort((a, b) =>
      newSortOrder === "asc"
        ? a.updatedAt.localeCompare(b.updatedAt)
        : b.updatedAt.localeCompare(a.updatedAt)
    );
    setSortedData(sorted);
  };

  const handleUpdate = (item, newData) => {
    if (newData === "normal" || newData === "hidden" || newData === "waiting") {
      dispatch(updateBlogStatus(item, newData, token));
    }
  };

  const handleDelete = (idBlog) => {
    dispatch(deleteBlog(idBlog, token));
  };
  useEffect(() => {
    switch (sheet) {
      case "all":
        setSortedData(blogs);
        break;
      case "waiting":
        const data = blogs.filter((blog) => blog.status === "waiting");
        setSortedData(data);
        break;
      default:
        break;
    }
  }, [sheet, blogs]);

  return (
    <div className="d-flex flex-wrap">
      <AdminRouteWrapper />
      <div className="p-4 flex-1">
        <button
          className={`${sheet === "all" ? "bg-gray-200" : ""} px-2 py-1 mr-2 rounded`}
          onClick={() => setSheet("all")}>
          All
        </button>
        <button
          className={`${sheet === "waiting" ? "bg-gray-200" : ""} px-2 py-1 rounded`}
          onClick={() => setSheet("waiting")}>
          Waiting
        </button>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Thumbnail</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2" onClick={toggleSortOrder}>
                Updated At
                {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.length > 0 &&
              sortedData.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300"
                  onClick={() => history.push(`/blog/${item._id}`)}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">
                    <img className="h-[80px]" src={item.thumbnail} alt="" />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={item.status}
                      className="p-1 border border-gray-300 rounded"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        handleUpdate(item, e.target.value);
                      }}>
                      <option value="normal">Normal</option>
                      <option value="hidden">Hidden</option>
                      <option value="waiting">Waiting</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">{item.updatedAt}</td>
                  <td className="px-4 py-2">
                    <AiOutlineDelete
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blogs;
