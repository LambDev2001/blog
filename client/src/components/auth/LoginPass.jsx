
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login, register } from '../../redux/actions/authAction.js'
import { Text } from '../form/Input.jsx'

const LoginPass = () => {
  const [userLogin, setUserLogin] = useState({
    username: '',
    account: '',
    password: '',
    confirmPassword: "",
  })
  const [isRegister, setIsRegister] = useState(false)

  const dispatch = useDispatch()

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserLogin({ ...userLogin, [name]: value }) // update new name: account or password = value
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    isRegister
      ? dispatch(register(userLogin))
      : dispatch(login(userLogin))

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {isRegister && <Text name="username" value="username" onChange={handleChangeInput} />}
        <Text name="Account" value="account" onChange={handleChangeInput} />
        <Text name='Password' type="password" value="password" onChange={handleChangeInput} />
        {isRegister &&
          <>
            <Text name='Confirm password' type="password" value="confirmPassword" onChange={handleChangeInput} />
            <small className='text-primary' onClick={() => setIsRegister(!isRegister)}>You have account. Login here</small>
            <button type='submit' className='btn btn-dark w-100 mt-1'>Register</button>

          </>
        }
        {
          !isRegister &&
          <>
            <small className='text-primary' onClick={() => setIsRegister(!isRegister)}>You don't have account</small>
            <button type="submit" className="btn btn-dark w-100 mt-1">Login</button>
          </>
        }
      </form>
    </div>
  )
}

export default LoginPass