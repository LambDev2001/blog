import { getAPI, patchAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";
import { imageUpload } from "../../utils/HandleImage";

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
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateAdmin =
  ({ user, token, file = "" }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "LOADING", payload: { loading: true } });
      if (file) {
        const image = await imageUpload(file);
        user.avatar = image.url;
      }

      

      const res = await patchAPI(
        `update-admin/${user._id}`,
        { username: user.username, avatar: user.avatar },
        token
      );
      ResErrorData(res.data, dispatch);
      dispatch({ type: "UPDATE_AUTH", payload: { username: user.username, avatar: user.avatar } });
      dispatch({ type: "LOADING", payload: { loading: false } });
      dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    } catch (err) {
      console.error(err);
    }
  };
