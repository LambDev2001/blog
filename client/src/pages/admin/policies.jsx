import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import { TfiClose } from 'react-icons/tfi'

import { getAllPolicies } from '../../redux/actions/policiesAction'
import { updatePolicy, createPolicy, deletePolicy } from '../../redux/actions/policiesAction'
import AdminRouterWrapper from '../../utils/AdminRouteWrapper'
import { AiOutlineDelete } from 'react-icons/ai';

const Policies = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.accessToken)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    dispatch(getAllPolicies(token))
  }, [dispatch, token])


  const [sortedData, setSortedData] = useState([]);
  const policies = useSelector(state => state.policiesReducer)

  useEffect(() => {
    setSortedData(policies)
  }, [policies])

  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sorted = [...sortedData].sort((a, b) =>
      newSortOrder === 'asc'
        ? a.updatedAt.localeCompare(b.updatedAt)
        : b.updatedAt.localeCompare(a.updatedAt)
    );
    setSortedData(sorted);
  };

  const handleUpdate = (policy, newData) => {
    if (newData === "normal" || newData === "hidden") {
      dispatch(updatePolicy({ ...policy, status: newData }, token))
    } else {

      dispatch(updatePolicy({ ...policy, content: newData }, token))
    }
  };


  const handleCreatePolicy = (e) => {
    e.preventDefault();
    dispatch(createPolicy(e.target.content.value, token))
    setModal(false)
  };

  const handleDelete = (idPolicy) => {
    dispatch(deletePolicy(idPolicy, token))
  }


  return (
    <div className="p-4">
      <AdminRouterWrapper />
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Content</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2" onClick={toggleSortOrder} >
              Updated At
              {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 &&
            sortedData.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <textarea className="w-100 order border-gray-300 rounded"
                      type="text" value={item.content}
                      onChange={(e) => {
                        dispatch({
                          type: 'UPDATE_POLICY', payload: { ...item, content: e.target.value }
                        })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdate(item, e.target.value);
                          setEditingIndex(-1);
                        }
                      }}
                      onBlur={() => {
                        handleUpdate(item, item.content)
                        setEditingIndex(-1)
                      }}
                    />
                  ) : (
                    <span
                      onClick={() => setEditingIndex(index)}
                      className="cursor-pointer"
                    >
                      {item.content}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdate(item, e.target.value)}
                    className="p-1 border border-gray-300 rounded"
                  >
                    <option value="normal">Normal</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </td>
                <td className="px-4 py-2">{item.updatedAt}</td>
                <td className="px-4 py-2"> <AiOutlineDelete onClick={() => handleDelete(item._id)} /> </td>
              </tr>
            ))}
          <tr className='border-t border-gray-300'>
            <td colSpan="4" className=" px-4 py-2 text-center">
              <button
                onClick={() => setModal(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
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
        appElement={document.getElementById('root')}

      >
        <div className="modal-content flex flex-col">
          <button
            className="absolute top-[-20px] right-[-20px] bg-red-500 hover:bg-red-600 p-2"
            style={{ borderRadius: "4px" }}
            onClick={() => setModal(false)}
          >
            <TfiClose />
          </button>
          <h2 className="mb-4">Add New Policy</h2>
          <form onSubmit={(e) => handleCreatePolicy(e)} className="flex flex-col gap-2">
            <label>
              Content:
            </label>
            <textarea
              className="w-full p-1 border border-gray-300 rounded"
              cols="30"
              rows="10"
              name='content'
            ></textarea>
            <button
              className="self-end bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

      </Modal>
    </div>
  )
}

export default Policies