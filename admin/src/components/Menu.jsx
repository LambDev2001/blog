import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { LuFileWarning, LuGauge, LuUser, LuTags } from "react-icons/lu";
import {
  LiaFileAltSolid,
  LiaHandshakeSolid,
  LiaAngleLeftSolid,
  LiaAngleDownSolid,
} from "react-icons/lia";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { BsLayersHalf } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";

import { logoutAdmin } from "../redux/actions/authAction";

const Menu = () => {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(-1);
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.accessToken);
  const openMenu = useSelector((state) => state.menuReducer);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const history = useHistory();
  const dispatch = useDispatch();

  const logo = {
    img: "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1697772495/blog/ckov65p4msb127rlsnd0_sjbmvx.png",
    name: "AniRealm",
  };
  const listFunctions = [
    [LuGauge, "Dashboard", [["/"]], "admin"],
    [LuUser, "Manager User", [["/all-users"]], "admin"],
    [GrUserAdmin, "Manager Permit", [["/all-permits"]], "admin"],
    [LuTags, "Manager Categories", [["/categories"]], "admin"],
    [LiaHandshakeSolid, "Manager Policies", [["/policies"]], "admin"],
    [LiaFileAltSolid, "Manager Blog", [["/blogs"]], "permit"],
    [LuFileWarning, "Manager Reports", [["/reports"]], "permit"],
    [
      BsLayersHalf,
      "Theme",
      [
        ["Button", "/buttons"],
        ["color", "/colors"],
      ],
      "permit",
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
      className={`${!user ? "hidden" : "flex"} menu ${
        color.outside
      } rounded-lg sticky top-0 mr-1 p-1 custom-scroll-container h-32 overflow-hidden`}
      style={{ borderRadius: "0 10px 10px 0", zIndex: 999 }}
      onMouseEnter={() => handleOpenMenu()}
      onMouseLeave={() => handleOpenMenu()}>
      <div
        className="custom-scroll-content h-full overflow-auto"
        style={{ width: "100%", borderRadius: "0 10px 10px 0" }}>
        {/* logo */}
        <div
          onClick={() => history.push("/")}
          className={`m-1 py-2 px-1 d-flex align-items-center ${color.inside} shadow-md rounded-lg cursor-pointer`}>
          <img src={logo.img} alt="logo" className="ml-[1px] w-[40px] h-[40px] rounded-circle" />
          {menu && <div className="mx-3">{logo.name}</div>}
        </div>

        {/* user */}
        <div className={`m-1 py-2 px-1 cursor-pointer ${color.inside} shadow-md rounded-lg `}>
          {user ? (
            <div
              onClick={() => history.push(`/profile/${user._id}`)}
              className="d-flex align-items-center">
              <img
                src={user.avatar}
                alt="avatar"
                className="ml-[1px] w-[40px] h-[40px] rounded-circle"
              />
              {menu && <div className="mx-3">{user.username}</div>}
            </div>
          ) : (
            <div className="d-flex align-items-center" onClick={() => handleLogin}>
              <IoIosLogIn className="w-[40px] h-[40px]" />
              {menu && <div className="mx-3">Login</div>}
            </div>
          )}
        </div>

        {/* menu */}
        <div className={`${color.outside} p-1 my-2`}>
          {listFunctions.map(([Icon, future, listUrl, role], index) => (
            <div key={index}>
              {!!user && (user.role === "admin" || user.role === role) && (
                <div
                  key={index}
                  data-index={index}
                  className={`my-1 shadow-md rounded-lg ${
                    index === active ? color.active : color.inside
                  } overflow-hidden cursor-pointer`}>
                  <div
                    className={`p-2 cursor-pointer d-flex align-items-center w-100 ${
                      index === active && color.active
                    } rounded-lg overflow-hidden`}
                    onClick={() => handleActive(index)}>
                    {/* main icon */}
                    <Icon className="w-[40px] h-[40px]" />

                    {/* name function or link */}
                    {menu && listUrl.length === 1 && (
                      <div
                        className="d-flex align-items-center justify-content-between w-100"
                        onClick={() => history.push(listUrl[0][0])}>
                        <p className="mx-3">{future}</p>
                      </div>
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
                          <div
                            className={`d-flex align-items-center ml-[40px] py-2 ${color.inside} shadow-sm rounded-lg overflow-hidden cursor-pointer`}
                            onClick={() => history.push(list[1])}>
                            <p className="mx-3">{list[0]}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
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
