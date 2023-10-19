import { formatDistanceToNow } from "date-fns";

import { getAPI, postAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const createBlog = (blog, token) => async (dispatch) => {
  try {
    const res = await postAPI("blog", blog, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
  } catch (err) {
    console.error(err);
  }
};

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

export const getPopularBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI("popular-blogs");
    ResErrorData(res.data, dispatch);
    dispatch({ type: "GET_BLOGS", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const getBlogsByCategory = (idCategory) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const result = await getAPI(`blogs-category/${idCategory}`);
    ResErrorData(result.data, dispatch);

    let { nameCategory, blogs } = result.data;
    if (blogs.length > 0) {
      blogs = blogs.map((item) => {
        const date = new Date(item.updatedAt);
        item.updatedAt = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return item;
      });
    }

    dispatch({ type: "GET_BLOGS", payload: blogs });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return nameCategory;
  } catch (err) {
    console.error(err);
  }
};

export const getBlogsUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    let blogs = await getAPI("blogs", token);

    ResErrorData(blogs.data, dispatch);
    if (blogs.data.length > 0) {
      blogs.data = blogs.data.map((item) => {
        const date = new Date(item.updatedAt);
        item.updatedAt = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        let timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
        if (timeAgo.startsWith("about ")) {
          timeAgo = timeAgo.slice(6);
        } else if (timeAgo.startsWith("over ")) {
          timeAgo = timeAgo.slice(5);
        }

        return { ...item, timeAgo };
      });
    }

    dispatch({ type: "GET_BLOGS", payload: blogs.data });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return blogs.data;
  } catch (err) {
    console.error(err);
  }
};

export const getOtherUserBlogs = (idUser, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    let blogs = await getAPI(`user-blogs/${idUser}`, token);

    ResErrorData(blogs.data, dispatch);
    if (blogs.data.length > 0) {
      blogs.data = blogs.data.map((item) => {
        const date = new Date(item.updatedAt);
        item.updatedAt = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        let timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
        if (timeAgo.startsWith("about ")) {
          timeAgo = timeAgo.slice(6);
        } else if (timeAgo.startsWith("over ")) {
          timeAgo = timeAgo.slice(5);
        }

        return { ...item, timeAgo };
      });
    }

    dispatch({ type: "GET_BLOGS", payload: blogs.data });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return blogs.data;
  } catch (err) {
    console.error(err);
  }
};

export const getMyBlogs = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    let blogs = await getAPI("my-blogs", token);

    ResErrorData(blogs.data, dispatch);
    if (blogs.data.length > 0) {
      blogs.data = blogs.data.map((item) => {
        const date = new Date(item.updatedAt);
        item.updatedAt = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        let timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
        if (timeAgo.startsWith("about ")) {
          timeAgo = timeAgo.slice(6);
        } else if (timeAgo.startsWith("over ")) {
          timeAgo = timeAgo.slice(5);
        }

        return { ...item, timeAgo };
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

    let timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
    if (timeAgo.startsWith("about ")) {
      timeAgo = timeAgo.slice(6);
    } else if (timeAgo.startsWith("over ")) {
      timeAgo = timeAgo.slice(5);
    }

    dispatch({ type: "GET_BLOG", payload: [{ ...blog.data, timeAgo }] });

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
export const updateBlog = (idBlog, blog, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await patchAPI(`blog/${idBlog}`, blog, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const removeBlog = (idBlog) => async (dispatch) => {
  try {
    dispatch({ type: "REMOVE_BLOG", payload: idBlog });
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

export const likeBlog = (idBlog, token) => async (dispatch) => {
  try {
    const res = await postAPI(`like/${idBlog}`, {}, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "LIKE_BLOG", payload: { _id: idBlog, isLike: true } });
  } catch (err) {
    console.error(err);
  }
};

export const dislikeBlog = (idBlog, token) => async (dispatch) => {
  try {
    const res = await postAPI(`dislike/${idBlog}`, {}, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "DISLIKE_BLOG", payload: { _id: idBlog, isLike: false } });
  } catch (err) {
    console.error(err);
  }
};

export const increaseShare = (idBlog, token) => async (dispatch) => {
  try {
    const res = await patchAPI(`increase-share/${idBlog}`, {}, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "INCREASE_SHARE", payload: { idBlog } });
  } catch (err) {
    console.error(err);
  }
};

export const reportBlog =
  ({ blog, content, token }) =>
  async (dispatch) => {
    try {
      const res = await postAPI(`report`, { ids: blog._id, type: "blog", content }, token);
      ResErrorData(res.data, dispatch);
      dispatch({ type: "ALERT", payload: { type: "success", msg: res.data.msg } });
    } catch (err) {
      console.error(err);
    }
  };
