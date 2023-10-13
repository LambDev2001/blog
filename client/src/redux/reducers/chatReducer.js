const chatReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CHAT":
      return action.payload;

    case "SEND_CHAT":
      return [action.payload, ...state.messages];

    default:
      return state;
  }
};

export default chatReducer;
