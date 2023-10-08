import React from "react";

const Friend = (friends) => {
  return (
    <div className="w-100 min-w-[200px]">
      {Array.isArray(friends.friends) &&
        friends.friends.map((friend, index) => (
          <div key={index} className="d-flex align-items-center ">
            <img
              className="rounded-circle my-2 mr-2"
              src={friend.avatar}
              alt="avatar friend"
              style={{ width: "30px", height: "30px" }}
            />
            <div className="ml-2">{friend.username}</div>
          </div>
        ))}
    </div>
  );
};

export default Friend;
