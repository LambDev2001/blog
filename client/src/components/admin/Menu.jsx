import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersGear,
  faRightToBracket,
  faRightFromBracket,
  faAngleLeft,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { logoutAdmin } from "../../redux/actions/authAction";

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(-1);
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.accessToken);
  const openMenu = useSelector((state) => state.menuReducer);

  const logo = {
    img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    name: "BLOG NEW",
  };
  const listFunctions = [
    [faUsersGear, "Manager User", [["/admin/all-users"]]],
    [
      faUsersGear,
      "Manager Blog",
      [
        ["User1", "/admin/all-users1"],
        ["User2", "/admin/all-users2"],
      ],
    ],
  ];
  const color = {
    normal: "#ffff",
    active: "bg-gray-400",
    border: "rgba(60, 60, 60, 0.8)",
  };

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
    history.push("/admin/login");
  };

  const handleLogout = () => {
    dispatch(logoutAdmin(token));
    history.push("/admin/login");
  };

  // change with when click menu
  useEffect(() => {
    const elementMenu = document.querySelector(".menu");
    elementMenu.style.height = `${window.innerHeight}px`;
    elementMenu.style.width = menu ? "400px" : "70px";
  }, [menu]);

  return (
    <div
      className="menu bg-gray-200 rounded-lg d-flex sticky top-0 mr-1 p-1"
      style={{ borderRadius: "0 10px 10px 0", zIndex: 999 }}
      onMouseEnter={() => handleOpenMenu()}
      onMouseLeave={() => handleOpenMenu()}>
      <div className="" style={{ width: "100%", borderRadius: "0 10px 10px 0" }}>
        {/* logo */}
        <Link
          to="/admin"
          className="m-1 p-2 d-flex align-items-center bg-white shadow-md rounded-lg">
          <img src={logo.img} alt="logo" className="w-[40px] h-[40px] rounded-circle" />
          {menu && <div className="mx-3">{logo.name}</div>}
        </Link>

        {/* user */}
        <div className={`m-1 p-2 cursor-pointer bg-white shadow-md rounded-lg `}>
          {user ? (
            <Link to={`/admin/profile/${user._id}`} className="d-flex align-items-center">
              <img src={user.avatar} alt="avatar" className="w-[40px] h-[40px] rounded-circle" />
              {menu && <div className="mx-3">{user.username}</div>}
            </Link>
          ) : (
            <div className="d-flex align-items-center" onClick={() => handleLogin}>
              <FontAwesomeIcon icon={faRightToBracket} className="w-[40px] h-[40px]" />
              {menu && <div className="mx-3">Login</div>}
            </div>
          )}
        </div>

        {/* menu */}
        <div className="bg-gray-200 p-1 my-2">
          {listFunctions.map(([iconName, future, listUrl], index) => (
            <div
              key={index}
              data-index={index}
              className={`my-1 shadow-md rounded-lg ${
                index === active ? color.active : "bg-white"
              } `}>
              <div
                className={`p-2 cursor-pointer d-flex align-items-center w-100 ${
                  index === active && color.active
                } rounded-lg`}
                onClick={() => handleActive(index)}>
                {/* main icon */}
                <FontAwesomeIcon icon={iconName} className="w-[40px] h-[40px]" />

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
                    {index !== active ? (
                      <FontAwesomeIcon icon={faAngleLeft} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleDown} />
                    )}
                  </div>
                )}
              </div>

              {/* list child function */}
              <div className="bg-gray-200">
                {index === active &&
                  listUrl.length > 1 &&
                  listUrl.map((list, index) => (
                    <div key={index} className="py-1">
                      <Link
                        className="d-flex align-items-center ml-[40px] py-2 bg-white shadow-sm rounded-lg"
                        to={list[0]}>
                        <p className="mx-3">{list[0]}</p>
                      </Link>
                    </div>
                  ))}
              </div>
              <div></div>
            </div>
          ))}
        </div>

        {/* logout */}
        {user && (
          <div
            className="m-1 p-2 cursor-pointer d-flex align-items-center bg-white shadow-md rounded-lg"
            onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className="w-[40px] h-[40px]" />
            {menu && <div className="mx-3">Logout</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
