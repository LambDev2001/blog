
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginAdmin } from '../../../redux/actions/authAction'
import { Text } from '../form/Input'
import { useHistory } from 'react-router-dom'

const LoginPass = () => {
  const [infoUser, setInfoUser] = useState({
    account: '',
    password: '',
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setInfoUser({ ...infoUser, [name]: value }) // update new name: account or password = value
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Object.keys(infoUser).forEach(key => {
      if (infoUser[key] === "") {
        delete infoUser[key];
      }
    });

    dispatch(loginAdmin(infoUser))
    history.goBack()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Text name="Account" value="account" onChange={handleChangeInput} />
        <Text name='Password' type="password" value="password" onChange={handleChangeInput} />

        <button type="submit" className="btn btn-dark w-100 mt-1">Login</button>
      </form>
    </div>
  )
}

export default LoginPass