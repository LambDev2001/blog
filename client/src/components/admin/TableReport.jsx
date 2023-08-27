import React from 'react'
import { useHistory } from 'react-router-dom'

const TableReport = ({ data }) => {
  const history = useHistory()

  return (
    <table className='w-100'>
      <thead>
        <tr>
          <th>Sender</th>
          <th>Type</th>
          <th>Content</th>
          <th>Date create</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => {
            const dateCreate = new Date(item.updatedAt)
            const date = dateCreate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

            return (
              <tr className='pointer-cursor' key={index} onClick={() => history.push(`/admin/report/${item._id}`)}>
                <td>{item.author}</td>
                <td>{item.type}</td>
                <td>{item.content}</td>
                <td>{date}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default TableReport