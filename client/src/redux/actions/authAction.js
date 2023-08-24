import { postAPI, getAPI } from "../../utils/FetchData";

export const login = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await postAPI("login", infoUser);
    if (!res.data.user) {
      dispatch({
        type: "ALERT",
        payload: { type: "danger", msg: res.data.msg },
      });
      dispatch({ type: "LOADING", payload: { loading: false } });
      return;
    }
    dispatch({ type: "AUTH", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
    dispatch({ type: "ALERT", payload: { type: "success", msg: "Login success" } });
  } catch (err) {
    console.log({ smg: err });
  }
};

export const register = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "ALERT", payload: { loading: true } });

    await postAPI("register", infoUser);

    dispatch({ type: "ALERT", payload: { loading: false } });
    dispatch({ type: "ALERT", payload: { msg: "Check your email" } });
  } catch (err) {
    console.log({ smg: err });
  }
};

export const logout = (token) => async (dispatch) => {
  try {
    const res = await getAPI("logout", token);
    if (res.status === 200) {
      dispatch({ type: "AUTH", payload: {} });
      dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    } else {
      dispatch({ type: "ALERT", payload: { type: "danger", msg: res.data.msg } });
    }
  } catch (err) {
    console.log({ smg: err });
  }
};
