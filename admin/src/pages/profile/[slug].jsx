import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { BsCamera } from "react-icons/bs";

import { profileAdmin, updateAdmin } from "../../redux/actions/profileAction";
import Header from "../../components/global/Header";
import ChangePass from "../../components/global/ChangePass";
import Button from "../../components/global/theme/button/Button";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";

const Profile = () => {
  const { slug } = useParams();
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isChangeName, setIsChangeName] = useState(false);
  const token = useSelector((state) => state.authReducer.accessToken);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;
    const getInfoUser = async () => {
      const userInfo = await dispatch(profileAdmin(slug, token));
      setUser(userInfo);
      userInfo._id === slug ? setIsOwner(true) : setIsOwner(false);
    };
    getInfoUser();
  }, [slug, token, dispatch]);

  const handleChangeName = () => {
    setIsChangeName(!isChangeName);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAdmin({ user, token }));
    setIsChangeName(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const imageUrl = URL.createObjectURL(file);
    dispatch(updateAdmin({ user, token, file }));
    setUser({ ...user, avatar: imageUrl });

  };

  return (
    <div>
      <AdminRouteWrapper />
      <Header content="Profile" />

      <div className={`${color.outside} rounded-lg shadow-md`}>
        <div className="flex flex-wrap">
          <div className="m-2 flex-1 min-w-[400px]">
            {user && (
              <div className={`${color.inside} rounded-lg shadow-slate-300 p-3 h-100`}>
                <h2 className="text-2xl font-semibold mb-2">Information User</h2>
                <div className="">
                  <div className="flex">
                    <div className="w-1/2 text-lg font-bold my-auto mx-3">Username: </div>
                    <div className="w-1/2 ">
                      <div>
                        {isChangeName ? (
                          <div className="flex justify-between cursor-pointer">
                            <input
                              type="text"
                              placeholder="Write your name"
                              className="p-2 my-auto w-100 h-10 rounded outline-none shadow-md focus:border-b-2 focus:border-blue-500 hover:outline-solid hover:outline-lightgray"
                              name="username"
                              value={user.username}
                              onChange={handleUpdateUser}
                            />
                            <Button
                              text={"Exit"}
                              color={3}
                              type="submit"
                              onClick={(e) => handleSubmit(e)}
                            />
                          </div>
                        ) : (
                          <div className="flex justify-between cursor-pointer">
                            <div className="my-auto">{user.username}</div>
                            <Button
                              text={"Edit"}
                              color={2}
                              type="submit"
                              onClick={handleChangeName}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 text-lg font-bold my-auto mx-3">Account: </div>
                    <div className="w-1/2 ">{user.account}</div>
                  </div>
                  {!!user.role && (
                    <>
                      <div className="flex">
                        <div className="w-1/2 text-lg font-bold my-auto mx-3">Role: </div>
                        <div className="w-1/2 ">{user.role}</div>
                      </div>
                      <div
                        className="text-md font-bold m-2 mx-3 cursor-pointer text-blue-500 hover:underline"
                        onClick={() => setModal(true)}>
                        Change password
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* avatar */}
          <div className="m-2 flex-1 flex flex-wrap justify-content-around">
            <div className="flex-3 min-w-[300px]">
              {user && (
                <div className={`${color.inside} p-3 h-100 rounded-lg shadow-md`}>
                  <h2 className="text-lg font-semibold mb-2">Avatar</h2>
                  <div className="relative">
                    <img
                      className="rounded-circle w-[200px] h-[200px] m-auto object-cover"
                      src={user.avatar}
                      alt="User Avatar"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="imageUpload"
                      multiple
                    />
                    {isOwner && (
                      <label
                        htmlFor="imageUpload"
                        className={`border-1 bg-white rounded-full p-1 cursor-pointer absolute right-[20%] top-[70%]`}>
                        <BsCamera size={30} />
                      </label>
                    )}
                  </div>
                </div>
              )}
              {/* <img
src={currentAvatar ? currentAvatar : otherUser.avatar}
alt="avatar"
className="rounded-circle w-[100px] h-[100px] object-cover"
/>
<input
type="file"
accept="image/*"
onChange={handleImageChange}
className="hidden"
id="imageUpload"
multiple
/>
{isOwner && (
<label
  htmlFor="imageUpload"
  className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 rounded-full p-1 cursor-pointer absolute right-0 top-3/4`}>
  <BsCamera size={24} />
</label>
)} */}
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      {modal && <ChangePass setModal={setModal} token={token} />}
    </div>
  );
};

export default Profile;
