import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { BsPlusCircle } from "react-icons/bs";

import { addMember } from "../../redux/actions/memberAction";

const ModalAddMember = ({ themeColor, token, slug, handleOpenModalMember }) => {
  const [textSearch, setTextSearch] = useState("");
  const friends = useSelector((state) => state.friendReducer.friend);
  const [memberSearch, setMemberSearch] = useState(friends);
  const history = useHistory();
  const dispatch = useDispatch();

  const searchMember = (e) => {
    if (e.target.value === "") {
      setTextSearch("");
      setMemberSearch(friends);
      return;
    }

    setTextSearch(e.target.value);
    const filteredData = friends.filter((friend) =>
      friend.username.toLowerCase().includes(textSearch.toLowerCase())
    );
    setMemberSearch(filteredData);
  };

  const handleAddFriend = (user, e) => {
    e.stopPropagation();
    dispatch(addMember({ idRoom: slug, user, token }));
    handleOpenModalMember();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      {friends.length > 0 && (
        <div className={`${themeColor.sub} rounded-lg  w-[400px] shadow-lg overflow-hidden`}>
          <div className={`${themeColor.sub} px-4 py-3 `}>
            <div className="text-2xl font-semibold">Add member</div>
          </div>

          {/* Search */}
          <div
            className={`${themeColor.sub} ${themeColor.border} border-1 justify-between rounded-lg overflow-hidden px-3`}>
            <input
              type="text"
              className={`${themeColor.sub} w-100 py-2 focus:outline-none`}
              placeholder="Search member ..."
              value={textSearch}
              onChange={(e) => searchMember(e)}
            />
          </div>

          {/* Member */}
          <div className={`custom-scroll-container max-h-[400px]`}>
            <div className="custom-scroll-content h-100 overflow-auto px-2">
              {memberSearch.map((friend) => (
                <div
                  key={friend._id}
                  className={`${themeColor.sub} ${themeColor.border} ${themeColor.hoverBold} border-1 flex w-100 my-2 py-2 rounded-md cursor-pointer`}
                  onClick={() => history.push(`/profile/${friend._id}`)}>
                  <img
                    src={friend.avatar}
                    alt="avatar friend"
                    className="h-[40px] w-[40px] rounded-full mx-2"
                  />
                  <div className="my-auto mx-2">{friend.username}</div>

                  <div
                    className={`${themeColor.sub} ${themeColor.border} ${themeColor.hoverBold} border-1 ml-auto my-auto mr-2 rounded-full cursor-pointer`}
                    onClick={(e) => handleAddFriend(friend, e)}>
                    <BsPlusCircle size={30} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalAddMember;
