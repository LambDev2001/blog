import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ModalEditUser from "../modal/ModalEditUser";
import Blog2 from "../blog/Blog2";
import { getMyBlogs } from "../../../redux/actions/blogAction";
import ProfileFriend from "../ProfileFriend";

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("posts");
  const [isModal, setIsModal] = useState(false);
  const otherUser = useSelector((state) => state.userReducer);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();
  const history = useHistory;

  useEffect(() => {
    dispatch(getMyBlogs(token));
  }, [dispatch, token]);

  const handleTab = (tab) => {
    setCurrentTab(tab);
  };

  const handleModalProfile = () => {
    setIsModal(!isModal);
  };

  const height = window.innerHeight - 234;

  return (
    <div className="w-3/5">
      {Object.keys(otherUser).length > 0 && (
        <div>
          {/* Header */}
          <div className="flex justify-between mt-2 relative">
            {/* Start */}
            <div className="flex mx-2 mb-2 z-50">
              <img
                src={otherUser.avatar}
                alt="avatar"
                className="rounded-circle w-[100px] h-[100px]"
              />
              {/* Basic info */}
              <div className="mt-auto mx-3">
                <div className="text-2xl font-semibold">{otherUser.username}</div>
                <div
                  className="cursor-pointer text-gray-200 hover:underline"
                  onClick={() => history.push(`/user/friend/${otherUser._id}`)}>
                  {otherUser.friends.length} friends
                </div>
              </div>
            </div>

            {/* End */}
            {!isModal && (
              <div
                className={`${themeColor.border} ${themeColor.hover} border-1 mb-3 mt-auto mx-2 p-2 rounded-md z-50 cursor-pointer`}
                onClick={() => handleModalProfile()}>
                Edit Profile
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
                {currentTab === "posts" && <Blog2 />}
                {currentTab === "friends" && <ProfileFriend friends= {otherUser.friends} />}
              </div>
            </div>

            {/* {Object.keys(blogs).length > 0 && <Blog2 />} */}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModal && <ModalEditUser user={otherUser} handleShowModal={handleModalProfile} />}
    </div>
  );
};

export default Profile;
