import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { GoSearch } from "react-icons/go";

import ModalLogin from "../../components/modal/ModalLogin";

import { logout } from "../../redux/actions/authAction";
import { searchAll } from "../../redux/actions/menuAction";

const Header = () => {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState("blog");
  const [typeModal, setTypeModal] = useState("login");
  const [data, setData] = useState([]);
  const theme = useSelector((state) => state.mainTheme);
  const [isDarkMode, setIsDarkMode] = useState(theme);
  const user = useSelector((state) => state.authReducer.user);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleTheme = (type) => {
    dispatch({ type: "CHANGE_THEME_USER", payload: type });
    dispatch({ type: "UPDATE_MAIN_THEME", payload: type });
    setIsDarkMode(type);
  };

  const handleModalLogin = (state) => {
    setTypeModal(state);
    setModalLogin(!modalLogin);
  };

  const handleLinkProfile = () => {
    history.push(`/profile/${user._id}`);
    setModalUser(false);
  };

  const handleLogout = () => {
    dispatch(logout(token));
    setModalUser(false);
    history.push("/");
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = async (e) => {
    if (e.target.value === "" || e.target.value.length < 2) return setData([]);
    const res = await dispatch(searchAll({ value: e.target.value, type: selectedOption, token }));
    setData(res);
  };

  const handleLink = (to) => {
    history.push(to);
    setData([]);
    document.getElementsByName("search")[0].value = "";
  };

  return (
    <div
      className={`${themeColor.sub} ${themeColor.text} ${themeColor.border} flex justify-between h-[60px] border-b relative shadow-md`}>
      {/* logo */}
      <div className="flex mx-2 my-auto cursor-pointer" onClick={() => history.push("/")}>
        <img
          src="https://res.cloudinary.com/dfuaq9ggj/image/upload/v1697772495/blog/ckov65p4msb127rlsnd0_sjbmvx.png"
          alt="logo"
          className="w-[32px] h-[32px] m-1 rounded-full"
        />
        <div className="text-lg font-semibold m-1">BlogD</div>
      </div>

      {/* search */}
      <div className={`${themeColor.sub} my-auto w-50 relative`}>
        <input
          type="text"
          className={`${themeColor.input} w-100 py-2 px-3 rounded-full shadow-md appearance-none leading-tight focus:outline-none`}
          placeholder="Search Blogs ..."
          name="search"
          onChange={(e) => handleSearch(e)}
        />
        <div
          className={`${themeColor.input} absolute top-1 right-3 flex text-right focus:border-none`}>
          <select
            className={themeColor.input + " focus:border-none"}
            name="type"
            value={selectedOption}
            onChange={handleChange}>
            <option value="blog">Blog</option>
            <option value="user">User</option>
            <option value="category">Category</option>
          </select>
          <GoSearch color={isDarkMode === "black" ? "white" : "black"} size={28} />
        </div>
      </div>

      {/* End */}
      <div className="my-auto mx-3 flex">
        {/* Change Theme */}
        <div className={"mx-3 my-auto"}>
          <button
            className={`${
              themeColor.border
            } border-1 w-14 h-8 flex items-center justify-between rounded-full p-1 relative overflow-hidden ${
              isDarkMode === "black" ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={() => toggleTheme(isDarkMode === "black" ? "white" : "black")}>
            <span
              className={`w-6 h-6 rounded-full ${
                isDarkMode === "black" ? "translate-x-full bg-gray-300" : "bg-gray-800"
              } absolute transform transition-transform duration-300 ease-in-out`}></span>
          </button>
        </div>

        {/* Auth */}
        {user ? (
          <div>
            <img
              src={user.avatar}
              alt="avatar"
              className="rounded-full w-[40px] h-[40px] object-cover cursor-pointer"
              onMouseEnter={() => setModalUser(true)}
            />
            {modalUser && (
              <div
                className={`${themeColor.input} ${themeColor.border} border-1 absolute top-[60px] right-4 py-1 px-1 rounded-lg z-50`}
                onMouseLeave={() => setModalUser(false)}>
                <div
                  className={`${themeColor.hoverBold} py-2 px-4 mx-2 my-1 rounded-lg cursor-pointer`}>
                  <div onClick={handleLinkProfile}>Profile</div>
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
          <div className="flex">
            <div
              className={`${themeColor.hover} ${themeColor.border} border-1 mx-1 py-2 px-3 rounded-full cursor-pointer`}
              onClick={() => handleModalLogin("register")}>
              <div>Register</div>
            </div>
            <div
              className={`${themeColor.hover} ${themeColor.border} border-1 mx-1 py-2 px-3 rounded-full cursor-pointer`}
              onClick={() => handleModalLogin("login")}>
              <div>Login</div>
            </div>
          </div>
        )}

        {modalLogin && (
          <ModalLogin
            handleModalLogin={handleModalLogin}
            typeModal={typeModal}
            setTypeModal={setTypeModal}
          />
        )}
      </div>

      {data.length > 0 && selectedOption === "blog" && (
        <div
          className={`${themeColor.main} ${themeColor.border} border-1 absolute top-[60px] right-1/2 translate-x-1/2 w-[600px] px-1 pt-1 rounded-md z-[100] shadow-lg`}>
          {data.map((blog, index) => (
            <div
              key={index}
              className={
                themeColor.input +
                " " +
                themeColor.hoverBold +
                " flex mb-1 p-1 cursor-pointer rounded-md"
              }
              onClick={() => handleLink(`/blog/${blog._id}`)}>
              <div className="w-3/4 mx-2">
                <div className="mb-2 font-bold text-md">{blog.title}</div>
                <div className="text-md">{blog.description}</div>
              </div>
              <img
                src={blog.thumbnail}
                alt="thumbnail"
                className="max-w-[33%] max-h-[120px] w-auto h-auto p-1 rounded-md object-cover m-auto"
              />
            </div>
          ))}
        </div>
      )}

      {data.length > 0 && selectedOption === "user" && (
        <div
          className={`${themeColor.main} ${themeColor.border} border-1 absolute top-[60px] right-1/2 translate-x-1/2 w-[600px] px-1 pt-1 rounded-md z-[100] shadow-lg`}>
          {data.map((user, index) => (
            <div
              key={index}
              className={
                themeColor.input +
                " " +
                themeColor.hoverBold +
                " flex mb-1 p-1 cursor-pointer rounded-md"
              }
              onClick={() => handleLink(`/profile/${user._id}`)}>
              <img
                src={user.avatar}
                alt="thumbnail"
                className="w-[60px] h-[60px] p-1 rounded-full object-cover"
              />
              <div className="mx-2">
                <div className="mb-2 font-bold text-md">{user.username}</div>
                <div className="text-md">{user.account}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.length > 0 && selectedOption === "category" && (
        <div
          className={`${themeColor.main} ${themeColor.border} border-1 absolute top-[60px] right-1/2 translate-x-1/2 w-[600px] px-1 pt-1 rounded-md z-[100] shadow-lg`}>
          {" "}
          {data.map((category, index) => (
            <div
              key={index}
              className={
                themeColor.input +
                " " +
                themeColor.hoverBold +
                " flex mb-1 p-1 cursor-pointer rounded-md"
              }
              onClick={() => handleLink(`/category/${category._id}`)}>
              <div className="mb-1 font-bold text-md">{category.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
