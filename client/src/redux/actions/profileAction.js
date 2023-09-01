import { getAPI } from "../../utils/FetchData";

export const profile = (idUser, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI(`info-user/${idUser}`, token);
    if (res.data.err) {
      dispatch({ type: "ALERT", payload: { type: "danger", msg: res.data.err } });
      dispatch({ type: "LOADING", payload: { loading: false } });
      return;
    }
    dispatch({ type: "LOADING", payload: { loading: false } });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const profileAdmin = (idUser, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI(`info-user/${idUser}`, token);
    if (res.data.err) {
      dispatch({ type: "ALERT", payload: { type: "danger", msg: res.data.err } });
      dispatch({ type: "LOADING", payload: { loading: false } });
      return;
    }
    dispatch({ type: "LOADING", payload: { loading: false } });
    return res;
  } catch (err) {
    console.error(err);
  }
};
