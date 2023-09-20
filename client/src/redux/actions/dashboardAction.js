import ResErrorData from "../../utils/ResErrorData";
import { getAPI } from "../../utils/FetchData";

export const getDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await getAPI("dashboard", token);
    ResErrorData(res.data, dispatch);

    dispatch({ type: "GET_DASHBOARD", payload: res.data });

    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};
