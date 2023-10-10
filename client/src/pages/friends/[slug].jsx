import React from "react";
import { useSelector } from "react-redux";

const FriendPage = () => {
  const themeColor = useSelector(state=>state.themeUserReducer)

  const user = {
    avatar: "https://tiemthuy.vn/wp-content/uploads/2021/11/dnp-ban-biet-gi-ve-ngoc-phi-thuy-19-e1573455875334.jpg",
    username: "Nguyen Van A",
  }

  return (
    <div>
      {/* Friends Request */}
      <div>
        <div className="my-2">
          <div className="text-3xl">Friend Requests</div>
          <div className="border-b"></div>
        </div>

        {/* Request Card */}
        <div className={themeColor.sub + " w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 rounded-md"}>
          <img src={user.avatar} alt="" className="h-30 object-cover rounded-md" />
          <div className="text-lg font-semibold my-1">{user.username}</div>
          <div className="flex flex-col mx-2">
            <button className="bg-blue-500 py-2 my-1 rounded-lg">Add Friend</button>
            <button className="bg-gray-400 py-2 my-1 rounded-lg">Remove</button>
          </div>
        </div>
      </div>

      {/* List Friend */}
      <div>
        <div className="my-2">
          <div className="text-3xl">All Friends</div>
          <div className="border-b"></div>
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
