import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { BsCamera } from "react-icons/bs";

import Blog2 from "../blog/Blog2";
import ProfileInfo from "../profile/ProfileInfo";
import ProfileFriend from "../profile/ProfileFriend";
import ProfileFollowing from "../profile/ProfileFollowing";
import ModalEditUser from "../modal/ModalEditUser";
import ModalChangePassword from "../modal/ModalChangePassword";

import { getOtherUserBlogs } from "../../redux/actions/blogAction";
import { sendRequest } from "../../redux/actions/friendAction";
import { updateUser } from "../../redux/actions/userAction";

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("info");
  const [isModal, setIsModal] = useState(false);
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState("");
  const otherUser = useSelector((state) => state.userReducer);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const friends = useSelector((state) => state.friendReducer.friend);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const { slug } = useParams();

  const isFriend = friends.find((friend) => friend._id === slug);
  const isOwner = slug === user._id;

  useEffect(() => {
    dispatch(getOtherUserBlogs(slug, token));
  }, [dispatch, slug, token]);

  const handleTab = (tab) => {
    setCurrentTab(tab);
  };

  const handleModalProfile = () => {
    setIsModal(!isModal);
  };

  const handleChangePassword = () => {
    setIsModalPassword(!isModalPassword);
  };

  const handleSendReq = () => {
    dispatch(sendRequest({ receiver: otherUser._id, token }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setCurrentAvatar(imageUrl);
    dispatch({ type: "UPDATE_AVATAR", payload: { avatar: imageUrl } });
    dispatch(updateUser({ ...otherUser, avatar: file }, token));
  };

  const height = window.innerHeight - 234;

  return (
    <div className={themeColor.text}>
      {Object.keys(otherUser).length > 0 && (
        <div>
          {/* Header */}
          <div className="flex justify-between mt-2 relative">
            {/* Start */}
            <div className="flex mx-2 mb-2 z-50 ">
              <div className="relative">
                <img
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
                )}
              </div>
              {/* Basic info */}
              <div className="mt-auto mx-3">
                <div className="text-2xl font-semibold">{otherUser.username}</div>
                <div className="cursor-pointer hover:underline">{otherUser.account} </div>
              </div>

              {/* Action */}
              {!isFriend && !isOwner && (
                <div className="mx-3 mt-auto my-2">
                  <div
                    className={
                      themeColor.border +
                      " p-2 border-1 hover:bg-blue-500 cursor-pointer rounded-md"
                    }
                    onClick={handleSendReq}>
                    Add friend
                  </div>
                </div>
              )}
            </div>

            {/* End */}
            {!isModal && isOwner && (
              <div className="z-[20] flex flex-wrap">
                <div
                  className={`${themeColor.border} ${themeColor.hover} border-1 mb-3 mt-auto mx-2 p-2 rounded-md cursor-pointer`}
                  onClick={() => handleChangePassword()}>
                  Change password
                </div>
                <div
                  className={`${themeColor.border} ${themeColor.hover} border-1 mb-3 mt-auto mx-2 p-2 rounded-md cursor-pointer`}
                  onClick={() => handleModalProfile()}>
                  Edit Profile
                </div>
              </div>
            )}

            <div className={`${themeColor.sub} absolute h-[70%] w-100 bottom-0 rounded-md`}></div>
          </div>

          <div className={`${themeColor.border} border-t mx-4 my-1`}></div>

          {/* Info  */}
          <div>
            {/* Tab */}
            <div className="flex mb-1">
              <div
                className={`${themeColor.sub} ${themeColor.border} ${
                  currentTab === "info" && themeColor.input
                } ${themeColor.hover} border-1 mx-1 px-3 py-2 rounded-sm cursor-pointer`}
                onClick={() => handleTab("info")}>
                Info
              </div>
              <div
                className={`${themeColor.sub} ${themeColor.border} ${
                  currentTab === "posts" && themeColor.input
                } ${themeColor.hover} border-1 mx-1 px-3 py-2 rounded-sm cursor-pointer`}
                onClick={() => handleTab("posts")}>
                Posts
              </div>
              <div
                className={`${themeColor.sub} ${themeColor.border} ${
                  currentTab === "friends" && themeColor.input
                } ${themeColor.hover} border-1 mx-1 px-3 py-2 rounded-sm cursor-pointer`}
                onClick={() => handleTab("friends")}>
                Friends
              </div>
              <div
                className={`${themeColor.sub} ${themeColor.border} ${
                  currentTab === "following" && themeColor.input
                } ${themeColor.hover} border-1 mx-1 px-3 py-2 rounded-sm cursor-pointer`}
                onClick={() => handleTab("following")}>
                Following
              </div>
            </div>

            <div className={`custom-scroll-container`} style={{ height: `${height}px` }}>
              <div className="custom-scroll-content h-100 overflow-auto">
                {currentTab === "info" && (
                  <ProfileInfo otherUser={otherUser} themeColor={themeColor} />
                )}
                {currentTab === "posts" && <Blog2 isOwner={isOwner} />}
                {currentTab === "friends" && <ProfileFriend friends={otherUser.friends} />}
                {currentTab === "following" && otherUser.following.length > 0 && (
                  <ProfileFollowing follows={otherUser.following} />
                )}
              </div>
            </div>

            {/* {Object.keys(blogs).length > 0 && <Blog2 />} */}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModal && <ModalEditUser user={otherUser} handleShowModal={handleModalProfile} />}
      {isModalPassword && (
        <ModalChangePassword token={token} handleShowModal={handleChangePassword} />
      )}
    </div>
  );
};

export default Profile;
