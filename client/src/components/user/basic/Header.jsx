import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { GoSearch } from "react-icons/go";

import ModalLogin from "../../../components/user/auth/ModalLogin";
import { logout } from "../../../redux/actions/authAction";

const Header = () => {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  const handleModalLogin = (state) => {
    setModalLogin(state);
  };

  const handleLogout = () => {
    dispatch(logout(token));
    setModalUser(false);
  };

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
        {user ? (
          <div>
            <img
              src={user.avatar}
              alt="avatar"
              className="rounded-full w-[40px] h-[40px]"
              onClick={() => setModalUser(!modalUser)}
            />
            {modalUser && (
              <div
                className={`${themeColor.input} absolute top-[60px] right-4 py-1 px-1 rounded-lg`}>
                <div
                  className={`${themeColor.hoverBold} py-2 px-4 mx-2 my-1 rounded-lg cursor-pointer`}>
                  <Link to={`/user/profile/${user._id}`}>Profile</Link>
                </div>
                <hr />
                <div
                  className={`${themeColor.hoverBold} py-2 px-4 mx-2 my-1 rounded-lg cursor-pointer`}
                  onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`${themeColor.hover} py-2 px-3 rounded-full cursor-pointer`}
            onClick={() => handleModalLogin(!modalLogin)}>
            <div>Login</div>
          </div>
        )}

        {modalLogin && <ModalLogin handleModalLogin={handleModalLogin} />}
      </div>
    </div>
  );
};

export default Header;
