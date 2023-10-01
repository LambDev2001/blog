const replyReducer = (state = [], action) => {
  switch (action.type) {
    // case "GET_REPLY":
    //   return action.payload;

    // case "SEND_REPLY":
    //   return [action.payload, ...state];

    default:
      return state;
  }
};

export default replyReducer;
