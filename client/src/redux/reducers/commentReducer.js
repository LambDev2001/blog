const commentReducer = (state = [], action) => {
  function findComment(comments, idComment, data, type) {
    for (let i = 0; i < comments.length; i++) {
      comments[i].isComment = false;
      if (comments[i]._id === idComment) {
        if (type === "get") {
          comments[i].replies = data;
        } else {
          comments[i].replies.unshift(...data);
        }
        return comments[i];
      }

      if (comments[i].replies) {
        const found = findComment(comments[i].replies, idComment, data);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  switch (action.type) {
    case "GET_COMMENTS":
      return action.payload;

    case "SEND_COMMENT":
      const result = state.filter((item) => item._id !== action.payload._id);
      return [{ ...action.payload, replies: [] }, ...result];

    case "GET_REPLY":
      findComment(state, action.payload.idComment, action.payload.data, "get");
      return state;

    case "SEND_REPLY":
      findComment(state, action.payload.idComment, action.payload.data, "send");
      return state;

    case "REMOVE_REPLY":
      return state.map((item) => (item.replies = action.payload));

    case "DELETE_COMMENT":
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default commentReducer;
