import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { GoSearch } from "react-icons/go";

import ModalLogin from "../../components/auth/ModalLogin";

import { logout } from "../../redux/actions/authAction";
import { searchAll } from "../../redux/actions/menuAction";

const Header = () => {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState("blog");
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.authReducer.user);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleModalLogin = (state) => {
    setModalLogin(state);
  };

  const handleLogout = () => {
    dispatch(logout(token));
    setModalUser(false);
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
      className={`${themeColor.sub} ${themeColor.border} flex justify-between h-[60px] border-b relative`}>
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
          name="search"
          onChange={(e) => handleSearch(e)}
        />
        <div className={`${themeColor.input} absolute top-1 right-3 flex text-white text-right focus:border-none`}>
          <select
            className={themeColor.input + " focus:border-none"}
            name="type"
            value={selectedOption}
            onChange={handleChange}>
            <option value="blog">Blog</option>
            <option value="user">User</option>
            <option value="category">Category</option>
          </select>
          <GoSearch color="white" size={28} />
        </div>
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
                  <Link to={`/profile/${user._id}`} onClick={() => setModalUser(false)}>
                    Profile
                  </Link>
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

      {data.length > 0 && selectedOption === "blog" && (
        <div
          className={
            themeColor.main +
            " absolute top-[60px] right-1/2 translate-x-1/2 w-[600px] px-1 pt-1 rounded-md z-[100]"
          }>
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
                className="w-1/3 max-h-[120px] p-1 rounded-md"
              />
            </div>
          ))}
        </div>
      )}

      {data.length > 0 && selectedOption === "user" && (
        <div
          className={
            themeColor.main +
            " absolute top-[60px] right-1/2 translate-x-1/2 w-[400px] px-1 pt-1 rounded-md z-[100]"
          }>
          {data.map((user, index) => (
            <div
              key={index}
              className={
                themeColor.input +
                " " +
                themeColor.hoverBold +
                " flex mb-1 p-1 cursor-pointer rounded-md"
              }
              onClick={() => handleLink(`/user/${user._id}`)}>
              <img
                src={user.avatar}
                alt="thumbnail"
                className="w-[60px] h-[60px] p-1 rounded-full"
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
          className={
            themeColor.main +
            " absolute top-[60px] right-1/2 translate-x-1/2 w-[400px] px-1 pt-1 rounded-md z-[100]"
          }>
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
