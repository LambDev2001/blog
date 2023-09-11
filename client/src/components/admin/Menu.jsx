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
    active: "rgb(1,123,254)",
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
      className="menu shadow-element d-flex sticky mr-1"
      style={{ borderRadius: "0 10px 10px 0" }}
      onMouseEnter={() => handleOpenMenu()}
      onMouseLeave={() => handleOpenMenu()}>
      <div style={{ width: "100%", borderRadius: "0 10px 10px 0" }}>
        {/* logo */}
        <Link
          to="/admin"
          className="m-1 p-2 d-flex align-items-center"
          style={{ borderBottom: `2px solid ${color.border}` }}>
          <img src={logo.img} alt="logo" className="w-[40px] h-[40px] rounded-circle" />
          {menu && <div className="mx-3">{logo.name}</div>}
        </Link>

        {/* user */}
        <div
          className="m-1 p-2 cursor-pointer"
          style={{ borderBottom: `2px solid ${color.border}` }}>
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
        {listFunctions.map(([iconName, future, listUrl], index) => (
          <div key={index} data-index={index} className="m-1">
            <div
              className={`p-2 cursor-pointer d-flex align-items-center w-100`}
              style={{
                backgroundColor: `${index === active ? color.active : ""}`,
                borderRadius: `${index === active ? "10px" : ""}`,
              }}
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
            <div className="mt-1">
              {index === active &&
                listUrl.length > 1 &&
                listUrl.map((list, index) => (
                  <Link
                    key={index}
                    className="d-flex align-items-center ml-[40px] p-2"
                    to={list[0]}>
                    <p className="mx-3">{list[0]}</p>
                  </Link>
                ))}
            </div>
            <div style={{ borderBottom: "1px solid #000", margin: "auto" }}></div>
          </div>
        ))}

        {/* logout */}
        {user && (
          <div className="m-1 p-2 cursor-pointer d-flex align-items-center" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className="w-[40px] h-[40px]" />
            {menu && <div className="mx-3">Logout</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
