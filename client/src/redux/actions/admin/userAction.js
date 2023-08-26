import { getAPI } from "../../../utils/FetchData";

export const allUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await getAPI("users", token);

    dispatch({ type: "LOADING", payload: { loading: false } });

    return res.data;
  } catch (err) {
    console.log({ smg: err });
  }
};

export const getUser = (idUser, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const user = await getAPI(`user/${idUser}`, token);

    const date = new Date(user.data.createdAt);
    user.data.createdAt = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})

    return user.data 
  } catch (err) {
    console.log({ smg: err });
  }
};
