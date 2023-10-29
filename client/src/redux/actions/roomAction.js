import { getAPI, postAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { imageUpload } from "../../utils/HandleImage";
import ResErrorData from "../../utils/ResErrorData";

export const getRooms = (token) => async (dispatch) => {
  try {
    const res = await getAPI("rooms", token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "GET_ROOMS", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const infoRoom = (idRoom, token) => async (dispatch) => {
  try {
    let res = await getAPI(`info-room/${idRoom}`, token);
    await ResErrorData(res.data, dispatch);

    const createdAt = new Date(res.data.createdAt);

    const day = createdAt.getDate();
    const month = createdAt.getMonth() + 1;
    const year = createdAt.getFullYear();

    res.data.createdAt = `${day}/${month}/${year}`;
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const createRoom = (room, token) => async (dispatch) => {
  try {
    const avatarRoom = await imageUpload(room.avatarRoom);
    const res = await postAPI("room", { ...room, avatarRoom: avatarRoom.url }, token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "ALERT", payload: { type: "success", msg: "Room created" } });

    dispatch({ type: "CREATE_ROOM", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const updateNameRoom =
  ({ slug, nameRoom, token }) =>
  async (dispatch) => {
    try {
      const res = await patchAPI(`room/${slug}`, { nameRoom }, token);
      await ResErrorData(res.data, dispatch);
    } catch (err) {
      console.error(err);
    }
  };

export const updateAvatarRoom =
  ({ slug, file, token }) =>
  async (dispatch) => {
    try {
      const avatarRoom = await imageUpload(file);
      const res = await patchAPI(`room/${slug}`, { avatarRoom: avatarRoom.url }, token);
      await ResErrorData(res.data, dispatch);
    } catch (err) {
      console.error(err);
    }
  };

export const deleteRoom =
  ({ room, token }) =>
  async (dispatch) => {
    try {
      const res = await deleteAPI(`room/${room._id}`, token);
      await ResErrorData(res.data, dispatch);
      
      dispatch({ type: "DELETE_ROOM", payload: room });
    } catch (err) {
      console.error(err);
    }
  };
