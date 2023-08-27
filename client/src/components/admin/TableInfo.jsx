import React from 'react'
import { useHistory } from 'react-router-dom'

const TableInfo = ({ data }) => {
  const history = useHistory()

  return (
    <div className='bg-white rounded mb-4 shadow-lg ml-2 mr-3 my-3'>
      <div style={{ boxShadow: "20px 32px 72px rgba(0, 0, 0, 0.5)", padding: "0.8rem 1rem" }}>
        <table className='table-auto w-full'>
          <thead>
            <tr className='text-center'>
              <th className="w-16 px-4 py-2">Avatar</th>
              <th className="w-16 px-4 py-2">Account</th>
              <th className="w-16 px-4 py-2">Username</th>
              <th className="w-16 px-4 py-2">Status</th>
              <th className="w-16 px-4 py-2">Report</th>
              <th className="w-16 px-4 py-2">Blog</th>
            </tr>
          </thead>


          <tbody className='bg-white cursor-pointer text-center'>
            {data.map((item, index) => (
              <tr className='border-t border-p' key={index} onClick={() => history.push(`user/${item._id}`)}>
                <td className='d-flex justify-center py-2'>
                  <img src={item.avatar} className="avatar" alt="" />
                </td>
                <td className='py-2'>{item.account}</td>
                <td className='py-2' >{item.username}</td>
                <td className='py-2'>{item.status}</td>
                <td className='py-2'>{item.report.length}</td>
                <td className='py-2'>{item.countBlogs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default TableInfo