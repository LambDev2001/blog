
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'

import { login } from '../../redux/actions/authAction.js'

const LoginPass = () => {
  const [userLogin, setUserLogin] = useState({
    account: '',
    password: ''
  })

  const dispatch = useDispatch()
  const { account, password } = userLogin;

  const handleChangeInput = (e) => {
    const { value, name } = e.target
    setUserLogin({ ...userLogin, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userLogin)
    dispatch(login(userLogin))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="account" className='form-label'>Email</label>
          <input type="text" className='form-control' id='account' name='account' value={account} onChange={handleChangeInput} />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className='form-label'>Email</label>
          <input type="text" className='form-control' id='password' name='password' value={password} onChange={handleChangeInput} />
        </div>

        <button type='submit' className='btn btn-dark w-100 mt-1'>Login</button>


      </form>
    </div>
  )
}

export default LoginPass