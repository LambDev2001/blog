import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const Header = () => {
  const auth = useSelector(state => state.authReducer)
  return (
    <nav className="navbar navbar-expand navbar-light bg-light space-x-4 justify-between">
      <div className=''>

      {[
        ['Home', '/'],
        ['Login', '/login'],

      ].map(([title, url]) => (
        <Link to={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900" key={url}>{title}</Link>
        ))}
        </div>
      <div className='d-flex'>
        <Link to={/user/ + auth.user._id} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"> {auth.user.username}</Link>
        <img className='rounded-circle img-fluid' style={{ height: '40px', with: "40px" }} src={auth.user.avatar} alt="avatar" />
      </div>

    </nav>

  )
}

export default Header