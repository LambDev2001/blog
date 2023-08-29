import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../redux/actions/admin/userAction'
import TableInfo from '../../components/admin/TableInfo'
import AdminRouteWrapper from '../../utils/AdminRouteWrapper'

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
    <AdminRouteWrapper>
      {listUsers &&
        <TableInfo data={listUsers} />
      }
    </AdminRouteWrapper>
  )
}

export default AllUser