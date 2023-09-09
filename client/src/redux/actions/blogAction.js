import { getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const getBlogs = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    let blogs = await getAPI("blogs-admin", token);
    ResErrorData(blogs.data, dispatch);
    if (blogs.data.length > 0) {
      blogs.data = blogs.data.map((item) => {
        const date = new Date(item.updatedAt);
        item.updatedAt = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return item;
      });
    }

    dispatch({ type: "GET_BLOGS", payload: blogs.data });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return blogs.data;
  } catch (err) {
    console.error(err);
  }
};

export const getBlog = (idBlog, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    let blog = await getAPI(`blog/${idBlog}`, token);
    ResErrorData(blog.data, dispatch);

    const date = new Date(blog.data.createdAt);
    blog.data.createdAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    

    dispatch({ type: "GET_BLOG", payload: blog.data });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return blog.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateBlogStatus = (blog, status, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await patchAPI(`status-blog/${blog._id}`, { status }, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    dispatch({ type: "UPDATE_BLOG", payload: { ...blog, status } });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const deleteBlog = (idBlog, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await deleteAPI(`blog/${idBlog}`, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    dispatch({ type: "DELETE_BLOG", payload: idBlog });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};
