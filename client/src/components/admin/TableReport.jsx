import React from 'react'
import { useHistory } from 'react-router-dom'

const TableReport = ({ data }) => {
  const history = useHistory()

  return (
    <div className='bg-white rounded mb-4 shadow-lg ml-2 mr-3 my-3'>
      <div style={{ boxShadow: "20px 32px 72px rgba(0, 0, 0, 0.5)", padding: "0.8rem 1rem" }}>
        <table className='table-auto w-full'>
          <thead>
            <tr className='text-center'>
              <th className='w-[16%] px-4 py-2'>Sender</th>
              <th className='w-[16%] px-4 py-2'>Type</th>
              <th className='w-[16%] px-4 py-2'>Content</th>
              <th className='w-[25%] px-4 py-2'>Date create</th>
              <th className='w-[25%] px-4 py-2'>Action</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full'>
          <tbody className='bg-white cursor-pointer'>
            {
              data.map((item, index) => {
                const dateCreate = new Date(item.updatedAt)
                const date = dateCreate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

                return (
                  <tr className='text-center' key={index} onClick={() => history.push(`/admin/report/${item._id}`)}>
                    <td className='w-[16%] px-4 py-2 border-t border-p'>{item.author}</td>
                    <td className='w-[16%] px-4 py-2 border-t border-p'>{item.type}</td>
                    <td className='w-[16%] px-4 py-2 border-t border-p'>{item.content}</td>
                    <td className='w-[25%] px-4 py-2 border-t border-p'>{date}</td>
                    <td className='w-[25%] px-4 py-2 border-t border-p'>
                      <button className='btn btn-outline-warning'
                        onClick={(e) => { e.stopPropagation(); console.log("declined") }}>
                        Decline
                      </button>
                      <button className='btn btn-outline-success'>Accept</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableReport