import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LuMoreHorizontal } from "react-icons/lu";

import Chat from "../../components/room/Chat";
import InputChat from "../../components/room/InputChat";
import { getChat } from "../../redux/actions/chatAction";
import SocketContext from "../../utils/SocketContext";
import Member from "../../components/room/Member";
import ModalLeaveRoom from "../../components/modal/ModalLeaveRoom";
import InfoRoom from "../../components/room/InfoRoom";

const ChatPage = () => {
  const [openAction, setOpenAction] = useState(false);
  const [page, setPage] = useState("chat");
  const [openModalLeave, setOpenModalLeave] = useState(false)
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const rooms = useSelector((state) => state.roomReducer);
  const data = useSelector((state) => state.chatReducer);
  const idUser = useSelector(state=> state.authReducer.user._id)
  const { slug } = useParams();
  const dispatch = useDispatch();

  const room = rooms.filter((item) => item._id === slug)[0];
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) socket.emit("join-room", slug);
    dispatch(getChat(slug, token));
  }, [dispatch, slug, token, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("new-message", (data) => {
        data.createdAt = new Date(data.createdAt).toLocaleString();
        dispatch({ type: "SEND_CHAT", payload: {data, idUser} });
      });
    }
  }, [dispatch, socket, idUser]);

  const handleOpenAction = () => {
    setOpenAction(!openAction);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleLeaveRoom = () =>{
    setOpenModalLeave(!openModalLeave)
  }
  

  // const handleImageChange = (event) => {
  //   const files = event.target.files;
  //   const promises = [];

  //   if (files && files.length > 0) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       const reader = new FileReader();

  //       promises.push(
  //         new Promise((resolve) => {
  //           reader.onload = () => {
  //             resolve(reader.result);
  //           };
  //           reader.readAsDataURL(file);
  //         })
  //       );
  //     }

  //     Promise.all(promises)
  //       .then((imageBase64Data) => {
  //         setFileImage([...fileImage, ...imageBase64Data]);
  //       })
  //       .catch((error) => {
  //         // Xử lý lỗi khi đọc tệp
  //       });
  //   }
  // };

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
        {room && (
          <div className=" flex my-auto mx-2">
            <img
              src={room.avatarRoom}
              alt="avatar room"
              className="h-[40px] w-[40px] rounded-full"
            />
            <div className="my-auto mx-2">{room.nameRoom}</div>
          </div>
        )}

        <div
          className={themeColor.input + " my-auto mx-2 p-1 rounded-full relative"}
          onClick={handleOpenAction}>
          <LuMoreHorizontal size={24} />

          {openAction && (
            <div
              className={`${themeColor.main} ${themeColor.border} absolute top-9 right-0 border-1 rounded-md z-[60]`}
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              <div
                className={`${themeColor.hoverBold} flex py-2 px-3 cursor-pointer mx-auto`}
                onClick={() => handlePage("chat")}>
                Chat
              </div>

              <div
                className={`${themeColor.hoverBold} flex py-2 px-3 cursor-pointer mx-auto`}
                onClick={() => handlePage("info")}>
                Information Group
              </div>

              <div
                className={`${themeColor.hoverBold} flex py-2 px-3 cursor-pointer mx-auto`}
                onClick={() => handlePage("member")}>
                Member
              </div>

              <div
                className={`${themeColor.hoverBold} flex py-2 px-3 cursor-pointer mx-auto`}
                onClick={() => handleLeaveRoom()}>
                Leave Room
              </div>
            </div>
          )}
        </div>
      </div>

      {page === "chat" && (
        <div>
          {/* Chat */}
          <Chat themeColor={themeColor} data={data} slug={slug} />

          {/* input */}
          <InputChat themeColor={themeColor} dispatch={dispatch} idRoom={slug} token={token} />
        </div>
      )}

      {page === "info" && <div><InfoRoom room={room} themeColor={themeColor} token={token} /></div>}

      {page === "member" && (
        <div>
          <Member themeColor={themeColor} slug={slug} token={token} />
        </div>
      )}

      {/* Modal Leave Room */}
      {
        openModalLeave && (
          <ModalLeaveRoom themeColor={themeColor} token={token} handleLeaveRoom={handleLeaveRoom} />
        )
      }
    </div>
  );
};

export default ChatPage;
