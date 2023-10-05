import { getAPI, patchAPI } from "../../utils/FetchData";
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


export const changeStatus =
  (idUser, status, token) =>
  async (dispatch) => {
    try {
      console.log( {idUser, status, token});
      
      dispatch({ type: "LOADING", payload: { loading: true } });
      const res = await patchAPI(`change-status/${idUser}`, { status }, token);
      ResErrorData(res.data, dispatch);
      dispatch({ type: "UPDATE_USER", payload: { status } });
      dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });

      dispatch({ type: "LOADING", payload: { loading: false } });
    } catch (err) {
      console.error(err);
    }
  };

  export const followUser = (idUser, token) => async (dispatch) => {
    try {
      const res = await patchAPI(`follow`, {idUser}, token);
      ResErrorData(res.data, dispatch);
      dispatch({ type: "FOLLOW_USER_BLOGS", payload: {idUser} });
      dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    } catch (err) {
      console.error(err);
    }
  }

  export const unFollowUser = (idUser, token) => async (dispatch) => {
    try {
      const res = await patchAPI(`un-follow`, {idUser}, token);
      ResErrorData(res.data, dispatch);
      dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    } catch (err) {
      console.error(err);
    }
  }


export const updateUser = (user, token) => async (dispatch) => {
  try {
    const res = await patchAPI(`user/${user._id}`, user, token);
    ResErrorData(res.data, dispatch);

    console.log(res.data);
    
  
  } catch (err) {
    console.error(err)
  }
}
