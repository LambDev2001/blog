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
