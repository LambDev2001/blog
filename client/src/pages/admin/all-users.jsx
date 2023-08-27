import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../redux/actions/admin/userAction'
import TableInfo from '../../components/admin/TableInfo'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const AllUser = () => {
  const dispatch = useDispatch()
  const [listUsers, setListUsers] = useState([])
  const token = useSelector(state => state.authReducer.accessToken)

  const history = useHistory()
  if (!token) history.push('/admin/login')

  useEffect(() => {
    const getUsers = async () => {
      setListUsers(await dispatch(allUsers(token)))
    }
    getUsers()

  }, [dispatch, token])

  return (
    <div>
      {listUsers &&
        <TableInfo data={listUsers} />
      }
    </div>
  )
}

export default AllUser