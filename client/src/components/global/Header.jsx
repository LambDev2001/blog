import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from '../../redux/actions/authAction'

const Header = () => {
  const token = useSelector(state => state.authReducer.accessToken)
  const auth = useSelector(state => state.authReducer)
  const [dropdown, setDropdown] = useState(false)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout(token))
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-light space-x-4 justify-between">
      <div>
        {[
          ['Home', '/'],
        ].map(([title, url]) => (
          <Link key={title} to={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
        ))}
      </div>
      {token && (
        <div className='d-flex' style={{ position: "relative" }}>
          <Link to="/user" className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"> {auth.user.username}</Link>
          <div className='anv-item dropdown'>
            <img className='rounded-circle img-fluid'
              style={{ height: '40px', with: "40px" }}
              src={auth.user.avatar} alt="avatar"
              onClick={() => { setDropdown(!dropdown) }}
            />
            {
              dropdown && (
                <div className="dropdown-menu d-block" style={{ position: "absolute", right: 0 }}>
                  {
                    [["Profile", `/profile/${auth.user._id}`]].map(([title, url]) => (
                      <Link key={title} className="dropdown-item" to={url}>{title}</Link>
                    ))
                  }
                  <div className="dropdown-divider"></div>
                  <Link to="#" onClick={handleLogout}
                    className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
                    Logout
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      )}
      {!token && (
        <div>
          {
            [["Login", "/login"]].map(([title, url]) => (
              <Link key={title} to={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
            ))
          }
        </div>
      )}


    </nav>

  )
}

export default Header