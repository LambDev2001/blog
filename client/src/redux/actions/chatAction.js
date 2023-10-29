import { getAPI, postAPI } from "../../utils/FetchData";
import { imageUpload } from "../../utils/HandleImage";
import ResErrorData from "../../utils/ResErrorData";

export const getChat = (idRoom, token) => async (dispatch) => {
  try {
    const res = await getAPI(`chats/${idRoom}`, token);

    await ResErrorData(res.data, dispatch);
    res.data.map((item) => {
      if (item.type === "image") {
        item.message = item.message.split(" ");
      }
      item.createdAt = new Date(item.createdAt).toLocaleString();
      return item;
    });

    dispatch({ type: "GET_CHAT", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const sendTextChat =
  ({ idRoom, message, token }) =>
  async (dispatch) => {
    try {
      await postAPI("chat", { idRoom, message, type: "text" }, token);
    } catch (err) {
      console.error(err);
    }
  };

export const sendImageChat =
  ({ idRoom, message, token }) =>
  async (dispatch) => {
    try {
      for (let i = 0; i < message.length; i++) {
        const image = await imageUpload(message[i]);
        message[i] = image.url;
      }
      message = message.join(" ");

      await postAPI("chat", { idRoom, message, type: "image" }, token);
    } catch (err) {
      console.error(err);
    }
  };
