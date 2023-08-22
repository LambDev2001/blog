import React from 'react'
import {Link} from "react-router-dom" 

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light space-x-4">

      {[
        ['Home', '/'],
        ['Login', '/login'],

      ].map(([title, url]) => (
        <Link to={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900" key={url}>{title}</Link>
      ))}
    </nav>

  )
}

export default Header