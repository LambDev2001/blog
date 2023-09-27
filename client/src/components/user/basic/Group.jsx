import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Group = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const history = useHistory();

  return (
    <div className={`${themeColor.sub} m-2 p-1 rounded-lg`}>
      <div className="text-xl font-semibold my-2 mx-3">Group</div>

      {/* 1 */}
      <div
        key={1}
        className={`${themeColor.main} p-2 my-1 flex justify-between rounded-lg cursor-pointer`}
        onClick={() => history.push("/user/room/{room._id}")}>
        <div className="flex">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="h-[28px] w-[28px]"
          />
          <div className="mx-2">Room1</div>
        </div>

        <div>
          12
        </div>
      </div>

            
    </div>
  );
};

export default Group;
