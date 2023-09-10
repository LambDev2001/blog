import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/global/Header'
import { allUsers } from '../../redux/actions/userAction'
import TableInfo from '../../components/admin/TableInfo'
import AdminRouteWrapper from '../../utils/AdminRouteWrapper'
import Search from '../../components/global/Search'

const AllUser = () => {
  const dispatch = useDispatch()
  const [listUsers, setListUsers] = useState([])
  const token = useSelector(state => state.authReducer.accessToken)

  useEffect(() => {
    const getUsers = async () => {
      setListUsers(await dispatch(allUsers(token)))
    }
    getUsers()

  }, [dispatch, token])

  return (
    <div>
      <AdminRouteWrapper />
      <Header />
      {listUsers.length > 0 &&
        <div>
          <Search data={listUsers} type={"user"} />
          <TableInfo data={listUsers} />
        </div>
      }
    </div>
  )
}

export default AllUser