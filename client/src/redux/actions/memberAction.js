import { getAPI, postAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";
export const getMembers = (slug, token) => async (dispatch) => {
  try {
    const res = await getAPI(`room-members/${slug}`, token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "GET_MEMBERS", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addMember = ({idRoom, user, token}) => async (dispatch) => {
  try {
    const res = await postAPI(`add-member/${idRoom}`, { idMember: user._id }, token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "ADD_MEMBER", payload: user });
    dispatch({ type: "INCREASE_MEMBER", payload: {idRoom, user }});
    
  } catch (err) {
    console.error(err);
  }
};

export const kickMember = (idRoom, user, token) => async (dispatch) => {
  try {
    const res = await postAPI(`kick-member/${idRoom}`, { idMember: user._id }, token);
    await ResErrorData(res.data, dispatch);

    dispatch({ type: "KICK_MEMBER", payload: user._id });
    dispatch({ type: "DECREASE_MEMBER", payload: {idRoom, user }});
    
  } catch (err) {
    console.error(err);
  }
};

export const leaveRoom = (idRoom, token) => async (dispatch) => {
  try {
    const res = await postAPI(`leave-room/${idRoom}`, {}, token);
    await ResErrorData(res.data, dispatch);

    
  } catch (err) {
    console.error(err);
  }
};
