import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllPolicies } from '../../redux/actions/admin/policiesAction'
import {updatePolicy} from '../../redux/actions/admin/policiesAction'

const Policies = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.accessToken)

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

  const handleUpdateStatus = (policy, status) => {
    dispatch(updatePolicy(policy, status, token))
  };


  return (
    <div className="p-4">
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
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 &&
            sortedData.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.content}</td>
                <td className="px-4 py-2">
                <select
                  value={item.status}
                  onChange={(e) => handleUpdateStatus(item, e.target.value)}
                  className="p-1 border border-gray-300 rounded"
                >
                  <option value="normal">Normal</option>
                  <option value="hidden">Hidden</option>
                </select>
                </td>
                <td className="px-4 py-2">{item.updatedAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Policies