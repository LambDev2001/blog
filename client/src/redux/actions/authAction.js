import { postAPI, getAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const login = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await postAPI("login", infoUser);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "AUTH", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
    dispatch({ type: "ALERT", payload: { type: "success", msg: "Login success" } });
  } catch (err) {
    console.error(err);
  }
};

export const register = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "ALERT", payload: { loading: true } });

    await postAPI("register", infoUser);

    dispatch({ type: "ALERT", payload: { loading: false } });
    dispatch({ type: "ALERT", payload: { msg: "Check your email" } });
  } catch (err) {
    console.error(err);
  }
};

export const logout = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI("logout", token);
    ResErrorData(res.data, dispatch);

    dispatch({ type: "LOADING", payload: { loading: false } });
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
  } catch (err) {
    console.error(err);
  }
};

export const changePass = (value, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await postAPI("reset-password", { value, token });
    ResErrorData(res.data, dispatch);
    dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const loginAdmin = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await postAPI("login-admin", infoUser);
    ResErrorData(res.data, dispatch);

    dispatch({ type: "AUTH", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
    dispatch({ type: "ALERT", payload: { type: "success", msg: "Login success" } });
  } catch (err) {
    console.error(err);
  }
};

export const logoutAdmin = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI("logout-admin", token);
    ResErrorData(res.data, dispatch);

    dispatch({ type: "LOADING", payload: { loading: false } });
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
  } catch (err) {
    console.error(err);
  }
};
