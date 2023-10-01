import { formatDistanceToNow } from "date-fns";

import { getAPI, postAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const getComments = (idBlog) => async (dispatch) => {
  try {
    let res = await getAPI(`comments/${idBlog}`);

    ResErrorData(res.data, dispatch);

    if (res.data.length > 0) {
      res.data = res.data.map((item) => {
        const date = new Date(item.createdAt);
        let timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
        if (timeAgo.startsWith("about ")) {
          timeAgo = timeAgo.slice(6);
        } else if (timeAgo.startsWith("over ")) {
          timeAgo = timeAgo.slice(5);
        } else if (timeAgo.startsWith("less than ")) {
          timeAgo = timeAgo.slice(10);
        }
        return { ...item, timeAgo };
      });
    }

    dispatch({ type: "GET_COMMENTS", payload: res.data });

    // dispatch({ type: "GET_COMMENTS", payload: {comments: res.data, replyComment} });
  } catch (err) {
    console.error(err);
  }
};

export const getReply = (idComment) => async (dispatch) => {
  try {
    let res = await getAPI(`reply/${idComment}`);

    ResErrorData(res.data, dispatch);

    if (res.data.length > 0) {
      res.data = res.data.map((item) => {
        const date = new Date(item.createdAt);
        let timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
        if (timeAgo.startsWith("about ")) {
          timeAgo = timeAgo.slice(6);
        } else if (timeAgo.startsWith("over ")) {
          timeAgo = timeAgo.slice(5);
        } else if (timeAgo.startsWith("less than ")) {
          timeAgo = timeAgo.slice(10);
        }
        return { ...item, timeAgo };
      });
    }

    dispatch({ type: "GET_REPLY", payload: { idComment, data: res.data } });
    return idComment
  } catch (err) {
    console.error(err);
  }
};

export const sendComment =
  ({ comment, idBlog, token }) =>
  async (dispatch) => {
    try {
      let res = await postAPI(`comment`, { message: comment, idBlog }, token);
      ResErrorData(res.data, dispatch);

      const date = new Date(res.data.createdAt);

      let timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
      if (timeAgo.startsWith("about ")) {
        timeAgo = timeAgo.slice(6);
      } else if (timeAgo.startsWith("over ")) {
        timeAgo = timeAgo.slice(5);
      } else if (timeAgo.startsWith("less than ")) {
        timeAgo = timeAgo.slice(10);
      }
      res.data = { ...res.data, timeAgo };

      dispatch({ type: "SEND_COMMENT", payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

export const sendReply =
  ({ comment, idBlog, idComment, token }) =>
  async (dispatch) => {
    try {
      let res = await postAPI(`comment`, { message: comment, idBlog, replyCM: idComment }, token);
      ResErrorData(res.data, dispatch);

      const date = new Date(res.data.createdAt);

      let timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
      if (timeAgo.startsWith("about ")) {
        timeAgo = timeAgo.slice(6);
      } else if (timeAgo.startsWith("over ")) {
        timeAgo = timeAgo.slice(5);
      } else if (timeAgo.startsWith("less than ")) {
        timeAgo = timeAgo.slice(10);
      }

      const replies = [];
      res.data = { ...res.data, timeAgo, replies };

      dispatch({ type: "SEND_REPLY", payload: { idComment, data: [res.data] } });
    } catch (err) {
      console.error(err);
    }
  };
