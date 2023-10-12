import { getAPI } from "../../utils/FetchData";

export const getChat = (idRoom, token) => async (dispatch) => {
  try {
    const res = getAPI(`chat/${idRoom}`, token);
    dispatch({ type: "GET_CHAT", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
