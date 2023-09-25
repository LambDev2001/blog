import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineDelete } from "react-icons/ai";

import Header from "../../components/global/Header";
import AdminRouterWrapper from "../../utils/AdminRouteWrapper";
import Pagination from "../../components/global/Pagination";
import Button from "../../components/global/theme/button/Button";
import { getAllPolicies } from "../../redux/actions/policiesAction";
import { updatePolicy, createPolicy, deletePolicy } from "../../redux/actions/policiesAction";

const Policies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("account");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [modal, setModal] = useState(false);
  const token = useSelector((state) => state.authReducer.accessToken);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const dispatch = useDispatch();
  const itemsPerPage = 8;

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
      <div className={`${color.outside} my-2 p-1 rounded-lg overflow-hidden`}>
        <table className="min-w-full bg-white rounded-t-lg overflow-hidden">
          <thead className={`${color.active}`}>
            <tr className={color.active}>
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
              <td colSpan="5" className=" px-4 py-2 text-center">
                <Button text={"Add New Policy"} color={2} onClick={() => setModal(true)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
            <Button text={"Submit"} color={2} type="submit" />
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
