import React from 'react'

const Friend = (friends) => {

  return (
      <table className='w-100'>
        <thead>
          <tr>
            <th colSpan={2}>Friend</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(friends.friends) &&
            friends.friends.map((friend, index) => (
              <tr key={index} className='space-x-4'>
                <td>
                  <img className='rounded-circle' src={friend.avatar} alt="avatar friend" style={{ width: "30px", height: "30px" }} />
                </td>
                <td className=''>{friend.username}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
  )
}

export default Friend