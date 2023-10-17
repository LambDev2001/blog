import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { BsPlusCircle } from "react-icons/bs";
import { LuMoreHorizontal } from "react-icons/lu";

import { getMembers, kickMember } from "../../redux/actions/memberAction";
import ModalAddMember from "../modal/ModalAddMember";

const Member = ({ themeColor, slug, token }) => {
  const [textSearch, setTextSearch] = useState("");
  const [openModalMember, setOpenModalMember] = useState(false);
  const [openAction, setOpenAction] = useState(-1);
  const [memberSearch, setMemberSearch] = useState([]);
  const members = useSelector((state) => state.memberReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const height = window.innerHeight - 135;

  useEffect(() => {
    const getRoomMembers = async () => {
      dispatch(getMembers(slug, token));
    };
    getRoomMembers();
  }, [dispatch, slug, token]);

  const searchMember = (e) => {
    if (e.target.value === "") {
      setTextSearch("");
      setMemberSearch([]);
      return;
    }

    setTextSearch(e.target.value);
    const filteredData = members.filter((member) =>
      member.username.toLowerCase().includes(textSearch.toLowerCase())
    );
    setMemberSearch(filteredData);
  };

  const handleAction = (idMember, e) => {
    e.stopPropagation();
    if (idMember === openAction) {
      setOpenAction(-1);
    } else {
      setOpenAction(idMember);
    }
  };

  const handleOpenModalMember = () => {
    setOpenModalMember(!openModalMember);
  };

  const handleKick = (user, e) => {
    e.stopPropagation();
    dispatch(kickMember(slug, user, token));
    setOpenAction(-1);
  };

  return (
    <div
      className={
        themeColor.sub +
        " " +
        themeColor.border +
        " my-1 py-auto rounded-lg border-1 custom-scroll-container"
      }
      style={{ height: `${height}px` }}>
      <div className="custom-scroll-content h-100 overflow-auto relative">
        {/* Search */}
        <div
          className={`${themeColor.input} ${themeColor.border} border-1 rounded-lg overflow-hidden px-3`}>
          <input
            type="text"
            className={`${themeColor.input} w-100 py-3 focus:outline-none`}
            placeholder="Search member ..."
            value={textSearch}
            onChange={(e) => searchMember(e)}
          />
        </div>

        {memberSearch.length > 0 && (
          <div
            className={`${themeColor.main} ${themeColor.border} w-[30%] border-1 px-2 py-1 flex flex-col absolute left-1/2 translate-x-[-50%] rounded-md`}>
            {memberSearch.map((member, index) => (
              <div
                key={index}
                className={`${themeColor.border} ${themeColor.hoverBold} border-1 flex my-1 px-3 py-2 rounded-md`}
                onClick={() => history.push(`/profile/${member._id}`)}>
                <img
                  src={member.avatar}
                  alt="avatar member"
                  className="h-[40px] w-[40px] rounded-full"
                />
                <div className="my-auto mx-2">{member.username}</div>
              </div>
            ))}
          </div>
        )}

        {/* Member */}
        <div className="grid grid-cols-2">
          <div
            className={`${themeColor.sub} ${themeColor.border} ${themeColor.hoverBold} border-1 m-auto py-2 rounded-full cursor-pointer`}
            onClick={handleOpenModalMember}>
            <BsPlusCircle size={30} />
          </div>

          {members &&
            members.map((member) => (
              <div
                key={member._id}
                className={`${themeColor.sub} ${themeColor.border} ${themeColor.hoverBold} relative border-1 flex w-[95%] my-2 mx-auto py-2 rounded-md`}
                onClick={() => history.push(`/profile/${member._id}`)}>
                <img
                  src={member.avatar}
                  alt="avatar member"
                  className="h-[40px] w-[40px] rounded-full mx-2"
                />
                <div className="my-auto mx-2">{member.username}</div>
                <div
                  className={`${themeColor.input} ${themeColor.hoverBold} ml-auto my-auto mr-3 rounded-full p-2`}
                  onClick={(e) => handleAction(member._id, e)}>
                  <LuMoreHorizontal size={20} />
                </div>

                {openAction === member._id && (
                  <div
                    className={`${themeColor.main} ${themeColor.border} ${themeColor.hoverBold} absolute right-0 top-[46px] px-3 py-2 border-1 rounded-md cursor-pointer z-50`}
                    onClick={(e) => handleKick(member, e)}>
                    Kick
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Modal add member */}
      {openModalMember && (
        <ModalAddMember
          themeColor={themeColor}
          token={token}
          handleOpenModalMember={handleOpenModalMember}
        />
      )}
    </div>
  );
};

export default Member;
