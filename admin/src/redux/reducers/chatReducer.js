const chatReducer = (state = { idRoom: "", messages: [] }, action) => {
  switch (action.type) {
    case "GET_CHAT":
      return action.payload;

    case "SEND_CHAT":
      return { ...state, messages: [action.payload, ...state.messages] };

    default:
      return state;
  }
};

export default chatReducer;
