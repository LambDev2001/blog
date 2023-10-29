import { postAPI, getAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const login = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await postAPI("login", infoUser);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "AUTH", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const register = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    await postAPI("register", infoUser);

    dispatch({ type: "LOADING", payload: { loading: false } });
    dispatch({ type: "ALERT", payload: { msg: "Check your email" } });
  } catch (err) {
    console.error(err);
  }
};

export const logout = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI("logout", token);
    await ResErrorData(res.data, dispatch);

    dispatch({ type: "LOADING", payload: { loading: false } });
    dispatch({ type: "AUTH", payload: {} });
  } catch (err) {
    console.error(err);
  }
};

export const changePass = (value, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await postAPI("reset-password", { value, token });
    await ResErrorData(res.data, dispatch);

    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const forgotPassword = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await postAPI("forgot-password", infoUser);
    ResErrorData(res.data, dispatch);
  } catch (err) {
    console.error(err);
  }
};

export const loginAdmin = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await postAPI("login-admin", infoUser);
    await ResErrorData(res.data, dispatch);

    dispatch({ type: "AUTH", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const logoutAdmin = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI("logout-admin", token);
    await ResErrorData(res.data, dispatch);

    dispatch({ type: "LOADING", payload: { loading: false } });
    dispatch({ type: "AUTH", payload: {} });
  } catch (err) {
    console.error(err);
  }
};
