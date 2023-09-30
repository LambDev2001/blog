const commentReducer = (state =[], action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return action.payload;

    case "SEND_COMMENT":
      return [action.payload, ...state];

    default:
      return state;
  }
};

export default commentReducer;
