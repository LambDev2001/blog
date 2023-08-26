import { getAPI } from "../../../utils/FetchData";

export const profile = (idUser, token) => async (dispatch) => {
  try {
    if (!token) {
      dispatch({ type: "ALERT", payload: { type: "danger", msg: "You need to login" } });
      return;
    }
    const res = await getAPI(`info-user/${idUser}`, token);
    if (res.data.msg) {
      dispatch({ type: "ALERT", payload: { type: "danger", msg: res.data.msg } });
      return;
    }
    return res;
  } catch (err) {
    console.log({ smg: err });
  }
};

export const profileAdmin = (idUser, token) => async (dispatch) => {
  try {
    if (!token) {
      dispatch({ type: "ALERT", payload: { type: "danger", msg: "You need to login" } });
      return;
    }
    const res = await getAPI(`info-user/${idUser}`, token);
    if (!res || !res.data.user) {
      dispatch({ type: "ALERT", payload: { type: "danger", msg: res.data.msg } });
      return;
    }
    return res;
  } catch (err) {
    console.log({ smg: err });
  }
};