import { getAPI, postAPI, patchAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";
import { imageUpload } from "../../utils/HandleImage";

export const allUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await getAPI("users", token);
    await ResErrorData(res.data, dispatch);

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

export const getInfoUser = (idUser, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const user = await getAPI(`info-user/${idUser}`, token);

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

export const changeStatus = (idUser, status, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await patchAPI(`change-status/${idUser}`, { status }, token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "UPDATE_USER", payload: { status } });

    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const followUser = (idUser, token) => async (dispatch) => {
  try {
    const res = await patchAPI(`follow`, { idUser }, token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "FOLLOW_USER", payload: { idUser } });
  } catch (err) {
    console.error(err);
  }
};

export const unFollowUser = (idUser, token) => async (dispatch) => {
  try {
    const res = await patchAPI(`un-follow`, { idUser }, token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "UN_FOLLOW_USER", payload: idUser });
  } catch (err) {
    console.error(err);
  }
};


export const unFriend = (idUser, token) => async (dispatch) => {
  try {
    const res = await postAPI(`un-friend/${idUser}`, "", token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "UN_FRIEND", payload: idUser });
    dispatch({ type: "REMOVE_FRIEND", payload: idUser });
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (user, token) => async (dispatch) => {
  try {
    if (typeof user.avatar === "object") {
      const image = await imageUpload(user.avatar);
      user.avatar = image.url;
    }

    const res = await patchAPI(`user/${user._id}`, user, token);
    await ResErrorData(res.data, dispatch);

    dispatch({ type: "UPDATE_USER", payload: user });
  } catch (err) {
    console.error(err);
  }
};

export const changePassword =
  ({ currentPassword, newPassword }, token) =>
  async (dispatch) => {
    console.log({ currentPassword, newPassword });

    try {
      const res = await postAPI(`change-password`, { currentPassword, newPassword }, token);
      await ResErrorData(res.data, dispatch);
    } catch (err) {
      console.log(err);
    }
  };

export const resetNewPassword = (newPassword, slug) => async (dispatch) => {
  try {
    const res = await postAPI("reset-password", { newPassword, token: slug }, "");
    await ResErrorData(res.data, dispatch);
    if (res.data) {
      window.close();
    }
  } catch (err) {
    console.log(err);
  }
};
