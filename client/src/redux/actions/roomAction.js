import { getAPI, postAPI } from "../../utils/FetchData";
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
    dispatch({ type: "CREATE_ROOM", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
