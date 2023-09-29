const commentReducer = (state =[], action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return action.payload;

    case "SEND_COMMENT":
      return {comments: [action.payload, ...state.comments], replyComment: state.replyComment};

    default:
      return state;
  }
};

export default commentReducer;
