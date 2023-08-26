
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login, register } from '../../../redux/actions/global/authAction'
import { Text } from '../../global/form/Input'

const LoginPass = () => {
  const [infoUser, setInfoUser] = useState({
    username: '',
    account: '',
    password: '',
    confirmPassword: "",
  })
  const [isRegister, setIsRegister] = useState(false)

  const dispatch = useDispatch()

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

    isRegister
      ? dispatch(register(infoUser))
      : dispatch(login(infoUser))
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