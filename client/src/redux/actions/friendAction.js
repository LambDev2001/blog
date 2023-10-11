import ResErrorData from "../../utils/ResErrorData";
import { getAPI, postAPI, deleteAPI } from "../../utils/FetchData";

export const getFriendPage =
  ({ idUser, token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "LOADING", payload: { loading: true } });
      const friends = await getAPI(`friends`, token);
      const reqFriend = await getAPI(`waiting-friends`, token);
      ResErrorData(reqFriend.data, dispatch);
      ResErrorData(friends.data, dispatch);

      dispatch({ type: "GET_REQUEST", payload: reqFriend.data });
      dispatch({ type: "GET_FRIEND", payload: friends.data });
      dispatch({ type: "LOADING", payload: { loading: false } });
    } catch (err) {
      console.error(err);
    }
  };

export const sendRequest =
  ({ receiver, token }) =>
  async (dispatch) => {
    try {
      const res = await postAPI("sending-friend", {receiver}, token);
      ResErrorData(res, dispatch);
      dispatch({ type: "ALERT", payload: { type: "success", msg: "Sended request" } });
    } catch (err) {
      console.error(err);
    }
  };

export const accept =
  ({ idUser, token }) =>
  async (dispatch) => {
    try {
      const res = await postAPI("accept-friend", { idSender: idUser }, token);
      ResErrorData(res, dispatch);
      dispatch({ type: "ACCEPT", payload: idUser });
      
    } catch (err) {
      console.error(err);
    }
  };

export const decline =
  ({ idUser, token }) =>
  async (dispatch) => {
    try {
      const res = await deleteAPI(`decline-friend/${idUser}`, token);
      ResErrorData(res, dispatch);
      dispatch({ type: "DECLINE", payload: idUser });
    } catch (err) {
      console.error(err);
    }
  };
