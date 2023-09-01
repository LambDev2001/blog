import { getAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const getBlogs = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const blogs = await getAPI("blogs-admin", token);
    ResErrorData(blogs.data, dispatch);

    const date = new Date(blogs.data.createdAt);
    blogs.data.updatedAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    dispatch({ type: "GET_BLOGS", payload: blogs.data });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return blogs.data;
  } catch (err) {
    console.error(err);
  }
};
