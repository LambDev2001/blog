import React from 'react'

import LoginPass from "../../components/user/auth/LoginPass.jsx";


const Login = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='w-50'>
        <LoginPass type="admin" />
      </div>
    </div>
  )
}

export default Login