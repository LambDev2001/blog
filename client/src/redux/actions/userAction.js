import { getAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const allUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await getAPI("users", token);
    ResErrorData(res.data, dispatch);

    dispatch({ type: "LOADING", payload: { loading: false } });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getUser = (idUser, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const user = await getAPI(`user/${idUser}`, token);

    ResErrorData(user.data, dispatch);

    const date = new Date(user.data.createdAt);
    user.data.createdAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dispatch({ type: "GET_USER", payload: user.data });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return user.data;
  } catch (err) {
    console.error(err);
  }
};
