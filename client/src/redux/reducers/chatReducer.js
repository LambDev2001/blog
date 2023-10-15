const chatReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CHAT":
      return action.payload;

    case "SEND_CHAT":
      const check = state.find((item) => item._id === action.payload._id);
      if (check) {
        return state;
      } else {
        return [action.payload, ...state];
      }

    default:
      return state;
  }
};

export default chatReducer;
