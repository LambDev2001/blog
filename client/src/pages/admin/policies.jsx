import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineDelete } from "react-icons/ai";

import Header from "../../components/global/Header";
import AdminRouterWrapper from "../../utils/AdminRouteWrapper";
import Pagination from "../../components/global/Pagination";
import { getAllPolicies } from "../../redux/actions/policiesAction";
import { updatePolicy, createPolicy, deletePolicy } from "../../redux/actions/policiesAction";

const Policies = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [modal, setModal] = useState(false);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("account");

  useEffect(() => {
    dispatch(getAllPolicies(token));
  }, [dispatch, token]);

  const policies = useSelector((state) => state.policiesReducer);
  

  useEffect(() => {
    if (sortField) {
      const sorted = [...policies].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] < b[sortField] ? -1 : 1;
        } else {
          return a[sortField] > b[sortField] ? -1 : 1;
        }
      });
      setSortedData(sorted);
    }
  }, [policies, sortOrder, sortField]);

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

  const handleUpdate = (policy, newData) => {
    if (newData === "normal" || newData === "hidden") {
      dispatch(updatePolicy({ ...policy, status: newData }, token));
    } else {
      dispatch(updatePolicy({ ...policy, content: newData }, token));
    }
  };

  const handleCreatePolicy = (e) => {
    e.preventDefault();
    dispatch(createPolicy(e.target.content.value, token));
    setModal(false);
  };

  const handleDelete = (idPolicy) => {
    dispatch(deletePolicy(idPolicy, token));
  };

  return (
    <div className="mx-2">
      <AdminRouterWrapper />
      <Header />
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-500">
            <th className="w-[1/10%] px-4 py-2" onClick={() => handleSort("#")}>
              #
            </th>
            <th className="w-[5/10%] px-4 py-2" onClick={() => handleSort("content")}>
              Content
            </th>
            <th className="w-[1/10%] px-4 py-2" onClick={() => handleSort("status")}>
              Status
            </th>
            <th className="w-[2/10%] px-4 py-2" onClick={() => handleSort("updatedAt")}>
              Updated At
            </th>
            <th className="w-[1/10%] px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 &&
            currentItems.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <textarea
                      className="w-100 order border-gray-300 rounded"
                      type="text"
                      value={item.content}
                      onChange={(e) => {
                        dispatch({
                          type: "UPDATE_POLICY",
                          payload: { ...item, content: e.target.value },
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdate(item, e.target.value);
                          setEditingIndex(-1);
                        }
                      }}
                      onBlur={() => {
                        handleUpdate(item, item.content);
                        setEditingIndex(-1);
                      }}
                    />
                  ) : (
                    <span onClick={() => setEditingIndex(index)} className="cursor-pointer">
                      {item.content}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdate(item, e.target.value)}
                    className="p-1 border border-gray-300 rounded">
                    <option value="normal">Normal</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </td>
                <td className="px-4 py-2">{item.updatedAt}</td>
                <td className="px-4 py-2">
                  {" "}
                  <AiOutlineDelete onClick={() => handleDelete(item._id)} />{" "}
                </td>
              </tr>
            ))}
          <tr className="border-t border-gray-300">
            <td colSpan="4" className=" px-4 py-2 text-center">
              <button
                onClick={() => setModal(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add New Policy
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        contentLabel="Example Modal"
        appElement={document.getElementById("root")}>
        <div className="modal-content flex flex-col">
          <button
            className="absolute top-[-20px] right-[-20px] bg-red-500 hover:bg-red-600 p-2"
            style={{ borderRadius: "4px" }}
            onClick={() => setModal(false)}>
            <TfiClose />
          </button>
          <h2 className="mb-4">Add New Policy</h2>
          <form onSubmit={(e) => handleCreatePolicy(e)} className="flex flex-col gap-2">
            <label>Content:</label>
            <textarea
              className="w-full p-1 border border-gray-300 rounded"
              cols="30"
              rows="10"
              name="content"></textarea>
            <button
              className="self-end bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
              type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
      
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

export default Policies;
