import { getAPI, postAPI, deleteAPI } from "../../utils/FetchData";
import { imageUpload } from "../../utils/HandleImage";
import ResErrorData from "../../utils/ResErrorData";

export const getRooms = (token) => async (dispatch) => {
  try {
    const res = await getAPI("rooms", token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "GET_ROOMS", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const createRoom = (room, token) => async (dispatch) => {
  try {
    const avatarRoom = await imageUpload(room.avatarRoom);
    const res = await postAPI("room", { ...room, avatarRoom: avatarRoom.url }, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "ALERT", payload: { type: "success", msg: "Room created" } });

    dispatch({ type: "CREATE_ROOM", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const deleteRoom =
  ({  room, token }) =>
  async (dispatch) => {
    try {
      const res = await deleteAPI(`room/${room._id}`, token);
      ResErrorData(res.data, dispatch);
      dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
      dispatch({ type: "DELETE_ROOM", payload: room });
    } catch (err) {
      console.error(err);
    }
  };
