import { postAPI } from "../../utils/FetchData";

export const login = (infoUser) => async (dispatch) => {
  try {
    dispatch({ type: "ALERT", payload: {loading: true} });

    const res = await postAPI('login', infoUser);
    dispatch({ type: "AUTH", payload: res.data });

    dispatch({ type: "ALERT", payload: {loading: false} });
  } catch (err) {
    console.log({smg: err});
  }
}