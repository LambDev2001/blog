import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { LuFileWarning, LuGauge, LuUser, LuTags } from "react-icons/lu";
import {
  LiaFileAltSolid,
  LiaHandshakeSolid,
  LiaAngleLeftSolid,
  LiaAngleDownSolid,
} from "react-icons/lia";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { BsLayersHalf } from "react-icons/bs";
import { logoutAdmin } from "../redux/actions/authAction";

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(-1);
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.accessToken);
  const openMenu = useSelector((state) => state.menuReducer);
  const color = useSelector((state) => state.themeReducer.themeColor);

  const logo = {
    img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    name: "BLOG NEW",
  };
  const listFunctions = [
    [LuGauge, "Dashboard", [["/dashboard"]]],
    [LuUser, "Manager User", [["/all-users"]]],
    [LiaFileAltSolid, "Manager Blog", [["/blogs"]]],
    [LuTags, "Manager Categories", [["/categories"]]],
    [LiaHandshakeSolid, "Manager Policies", [["/policies"]]],
    [LuFileWarning, "Manager Reports", [["/reports"]]],
    [
      BsLayersHalf,
      "Theme",
      [
        ["Button", "/buttons"],
        ["color", "/colors"],
      ],
    ],
  ];

  const handleOpenMenu = () => {
    setActive(-1);
    if (openMenu) {
      setMenu(true);
    } else {
      setMenu(!menu);
    }
  };

  useEffect(() => {
    setMenu(openMenu);
  }, [openMenu]);

  // choose function in menu
  const handleActive = (index) => {
    index === active ? setActive(-1) : setActive(index);
  };

  const handleLogin = () => {
    history.push("/login");
  };

  const handleLogout = () => {
    dispatch(logoutAdmin(token));
    setMenu(false);
    history.push("/login");
  };

  // change with when click menu
  useEffect(() => {
    const elementMenu = document.querySelector(".menu");
    elementMenu.style.height = `${window.innerHeight}px`;
    elementMenu.style.width = menu ? "400px" : "70px";
  }, [menu]);

  return (
    <div
      className={`menu ${color.outside} rounded-lg d-flex sticky top-0 mr-1 p-1 custom-scroll-container h-32 overflow-hidden`}
      style={{ borderRadius: "0 10px 10px 0", zIndex: 999 }}
      onMouseEnter={() => handleOpenMenu()}
      onMouseLeave={() => handleOpenMenu()}>
      <div
        className="custom-scroll-content h-full overflow-auto"
        style={{ width: "100%", borderRadius: "0 10px 10px 0" }}>
        {/* logo */}
        <Link
          to="/admin"
          className={`m-1 py-2 px-1 d-flex align-items-center ${color.inside} shadow-md rounded-lg`}>
          <img src={logo.img} alt="logo" className="ml-[1px] w-[40px] h-[40px] rounded-circle" />
          {menu && <div className="mx-3">{logo.name}</div>}
        </Link>

        {/* user */}
        <div className={`m-1 py-2 px-1 cursor-pointer ${color.inside} shadow-md rounded-lg `}>
          {user ? (
            <Link to={`/profile/${user._id}`} className="d-flex align-items-center">
              <img
                src={user.avatar}
                alt="avatar"
                className="ml-[1px] w-[40px] h-[40px] rounded-circle"
              />
              {menu && <div className="mx-3">{user.username}</div>}
            </Link>
          ) : (
            <div className="d-flex align-items-center" onClick={() => handleLogin}>
              <IoIosLogIn className="w-[40px] h-[40px]" />
              {menu && <div className="mx-3">Login</div>}
            </div>
          )}
        </div>

        {/* menu */}
        <div className={`${color.outside} p-1 my-2`}>
          {listFunctions.map(([Icon, future, listUrl], index) => (
            <div
              key={index}
              data-index={index}
              className={`my-1 shadow-md rounded-lg ${
                index === active ? color.active : color.inside
              } overflow-hidden`}>
              <div
                className={`p-2 cursor-pointer d-flex align-items-center w-100 ${
                  index === active && color.active
                } rounded-lg overflow-hidden`}
                onClick={() => handleActive(index)}>
                {/* main icon */}
                <Icon className="w-[40px] h-[40px]" />

                {/* name function or link */}
                {menu && listUrl.length === 1 && (
                  <Link
                    className="d-flex align-items-center justify-content-between w-100"
                    to={listUrl[0][0]}>
                    <p className="mx-3">{future}</p>
                  </Link>
                )}

                {menu && listUrl.length > 1 && (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <p className="mx-3">{future}</p>
                    {index !== active ? <LiaAngleLeftSolid /> : <LiaAngleDownSolid />}
                  </div>
                )}
              </div>

              {/* list child function */}
              <div className={`${color.active} `}>
                {index === active &&
                  listUrl.length > 1 &&
                  listUrl.map((list, index) => (
                    <div key={index} className="py-2 pr-1">
                      <Link
                        className={`d-flex align-items-center ml-[40px] py-2 ${color.inside} shadow-sm rounded-lg overflow-hidden`}
                        to={list[1]}>
                        <p className="mx-3">{list[0]}</p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* logout */}
        {user && (
          <div
            className={`m-1 py-2 px-1 cursor-pointer d-flex align-items-center ${color.inside} shadow-md rounded-lg`}
            onClick={handleLogout}>
            <IoIosLogOut className="w-[36px] h-[36px]" />
            {menu && <div className="mx-3">Logout</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;