import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFriendPage, accept, decline } from "../../redux/actions/friendAction";

const FriendPage = () => {
  const allFriends = useSelector((state) => state.friendReducer);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);
  const history = useHistory();

  useEffect(() => {
    dispatch(getFriendPage({ idUser: user._id, token }));
  }, [dispatch, token, user]);

  const handleAddFriend = (_id) => {
    dispatch(accept({ idUser: _id, token }));
  };

  const handleRemove = (_id) => {
    dispatch(decline({ idUser: _id, token }));
  };

  return (
    <div>
      {/* Friends Request */}
      <div>
        <div className="my-2">
          <div className="text-3xl">Friend Requests</div>
          <div className="border-b"></div>
        </div>

        {/* Request Card */}
        <div className="flex flex-wrap">
          {allFriends.req.length > 0 &&
            allFriends.req.map((req, index) => (
              <div
                key={index}
                className={`${themeColor.border} border-1 shadow-md p-1 w-full rounded-md sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden transform transition-transform hover:scale-105`}>
                <div className={themeColor.sub + "  p-2 rounded-md"}>
                  <img
                    src={req.avatar}
                    alt=""
                    className="rounded-full w-[150px] h-[150px] object-cover cursor-pointer m-auto"
                    onClick={() => history.push(`/profile/${req._id}`)}
                  />
                  <div className="text-lg font-semibold my-1">{req.username}</div>
                  <div className="flex flex-col mx-2">
                    <button
                      className="bg-blue-500 py-2 my-1 rounded-lg"
                      onClick={() => handleAddFriend(req._id)}>
                      Add Friend
                    </button>
                    <button
                      className="bg-gray-400 py-2 my-1 rounded-lg"
                      onClick={() => handleRemove(req._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* List Friend */}
      <div>
        <div className="my-2">
          <div className="text-3xl">All Friends</div>
          <div className="border-b"></div>
        </div>

        {/* Friend Card */}
        <div className="flex flex-wrap">
          {allFriends.friend.length > 0 &&
            allFriends.friend.map((req, index) => (
              <div
                key={index}
                className={`${themeColor.border} border-1 shadow-md p-1 w-full rounded-md sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden transform transition-transform hover:scale-105`}>
                <div className={themeColor.sub + "  p-2 rounded-md"}>
                  <img
                    src={req.avatar}
                    alt=""
                    className="rounded-full w-[150px] h-[150px] object-cover cursor-pointer m-auto"
                    onClick={() => history.push(`/profile/${req._id}`)}
                  />

                  <div className="text-lg font-semibold my-1">{req.username}</div>
                  <div className="text-md my-1">{req.account}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
