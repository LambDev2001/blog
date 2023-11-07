import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Chat from "../../components/room/Chat";
import InputChat from "../../components/room/InputChat";
import { getChat } from "../../redux/actions/chatAction";
import SocketContext from "../../utils/SocketContext";
import { getMembers } from "../../redux/actions/memberAction";

const ChatPage = () => {
  const [page] = useState("chat");
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const user = useSelector((state) => state.authReducer.user);
  const data = useSelector((state) => state.chatReducer);
  const idUser = useSelector((state) => state.authReducer.user._id);
  const members = useSelector((state) => state.memberReducer);
  const { slug } = useParams();
  const dispatch = useDispatch();

  const otherUser = members.filter((member) => member._id !== user._id)[0];

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) socket.emit("join-room", slug);
    dispatch(getChat(slug, token));
  }, [dispatch, slug, token, socket]);

  useEffect(() => {
    const getRoomMembers = async () => {
      dispatch(getMembers(slug, token));
    };
    getRoomMembers();
  }, [dispatch, slug, token]);

  useEffect(() => {
    if (socket) {
      socket.on("new-message", (data) => {
        data.createdAt = new Date(data.createdAt).toLocaleString();

        dispatch({ type: "SEND_CHAT", payload: { data, idUser } });
      });
    }
  }, [dispatch, socket, idUser]);

  return (
    <div>
      {/* header */}
      <div
        className={
          themeColor.sub +
          " " +
          themeColor.border +
          " flex justify-between my-1 rounded-lg border-b h-[60px]"
        }>
        {/* Start */}
        {otherUser && (
          <div className=" flex my-auto mx-2">
            <img
              src={otherUser.avatar}
              alt="avatar room"
              className="h-[40px] w-[40px] rounded-full"
            />
            <div className="my-auto mx-2">{otherUser.username}</div>
          </div>
        )}
      </div>

      {page === "chat" && (
        <div>
          {/* Chat */}
          <Chat themeColor={themeColor} data={data} slug={slug} />

          {/* input */}
          <InputChat themeColor={themeColor} dispatch={dispatch} idRoom={slug} token={token} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
