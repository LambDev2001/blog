import React from 'react'
import { useHistory } from 'react-router-dom'

const TableInfo = ({ data }) => {
  const thead = ["avatar", "account", "username", "status", "report", "blogs"]
  const history = useHistory()

  return (
    <table className='w-100'>
      <thead>
        <tr>
          {thead.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className='pointer-cursor' onClick={() => history.push(`user/${item._id}`)}>
            <td>
              <img src={item.avatar} className="avatar" alt="" />
            </td>
            <td>{item.account}</td>
            <td>{item.username}</td>
            <td>{item.status}</td>
            <td>{item.report.length}</td>
            <td>{item.countBlogs}</td>
          </tr>
        ))}
      </tbody>
    </table>


  )
}

export default TableInfo