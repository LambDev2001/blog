import { formatDistanceToNow } from "date-fns";

import { deleteAPI, getAPI, postAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const getComments = (idBlog) => async (dispatch) => {
  try {
    let res = await getAPI(`comments/${idBlog}`);

    await ResErrorData(res.data, dispatch);

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

    await ResErrorData(res.data, dispatch);

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
    return idComment;
  } catch (err) {
    console.error(err);
  }
};

export const sendComment =
  async({ comment, idBlog, token }) => {
    try {
      await postAPI(`comment`, { message: comment, idBlog }, token);
    } catch (err) {
      console.error(err);
    }
  };

export const sendReply =
  ({ comment, idBlog, idComment, token }) =>
  async (dispatch) => {
    try {
      await postAPI(`comment`, { message: comment, idBlog, replyCM: idComment }, token);
    } catch (err) {
      console.error(err);
    }
  };

export const reportComment =
  ({ comment, content, token }) =>
  async (dispatch) => {
    try {
      let res = await postAPI(`report`, { ids: comment._id, type: "comment", content }, token);
      await ResErrorData(res.data, dispatch);
      
    } catch (err) {
      console.error(err);
    }
  };

  export const deleteComment = (idComment, token) => async (dispatch) => {
    try {
      const res = await deleteAPI(`comment/${idComment}`, token)
      await ResErrorData(res.data, dispatch);
      dispatch({ type: "DELETE_COMMENT", payload: idComment });
      
    
    } catch (err) {
      console.error(err)
    }
  }
