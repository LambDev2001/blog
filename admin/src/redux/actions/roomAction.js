import { getAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";


export const getRooms = (token) => async (dispatch) => {
  try {
    const res = await getAPI("rooms", token);
    await ResErrorData(res.data, dispatch);
    dispatch({ type: "GET_ROOMS", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
