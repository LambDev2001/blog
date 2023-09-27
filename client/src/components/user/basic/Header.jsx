import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { GoSearch } from "react-icons/go";

const Header = () => {
  const user = useSelector((state) => state.authReducer.user);
  const themeColor = useSelector((state) => state.themeUserReducer);

  return (
    <div
      className={`${themeColor.sub} ${themeColor.border} flex justify-between h-[60px] border-b`}>
      {/* logo */}
      <div className="flex mx-2 my-auto">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="logo"
          className="w-[32px] h-[32px] m-1"
        />
        <div className="text-lg font-semibold m-1">Reddit</div>
      </div>

      {/* search */}
      <div className={`${themeColor.sub} my-auto w-50 relative`}>
        <input
          type="text"
          className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-full shadow appearance-none leading-tight focus:outline-none`}
          placeholder="Search Blogs ..."
        />
        <GoSearch className="absolute top-1 right-3" color="white" size={28} />
      </div>

      {/* login */}
      <div className="my-auto mx-2">
        {user.username ? (
          <div>
            <img src={user.avatar} alt="avatar" className="rounded-full w-[40px] h-[40px]" />
          </div>
        ) : (
          <div className={`${themeColor.hover} py-2 px-3 rounded-full`}>
            <Link to={`/user/login`}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
