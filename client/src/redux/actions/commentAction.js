import { getAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const getComments = (idBlog) => async (dispatch) => {
  try {
    const res = await getAPI(`comments/${idBlog}`);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "GET_COMMENTS", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};