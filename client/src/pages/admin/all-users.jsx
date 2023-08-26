import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../redux/actions/admin/userAction'
import TableInfo from '../../components/admin/TableInfo'


const AllUser = () => {
  const dispatch = useDispatch()
  const [listUsers, setListUsers] = useState([])
  const token = useSelector(state => state.authReducer.accessToken)
  const thead = ["avatar", "account", "username", "status", "report", "blogs"]

  useEffect(() => {
    const getUsers = async () => {
      setListUsers(await dispatch(allUsers(token)))
    }
    getUsers()

  }, [dispatch, token])

  return (
    <div>

      {listUsers &&

        <TableInfo thead={thead} tbody={listUsers} />
      }
    </div>
  )
}

export default AllUser