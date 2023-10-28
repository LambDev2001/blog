const chatReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CHAT":
      return action.payload;

    case "SEND_CHAT":
      if (action.payload.data.idUser === action.payload.idUser) action.payload.data.owner = true;
      if (action.payload.data.type === "image") {
        action.payload.data.message = action.payload.data.message.split(" ");
      }
      return [action.payload.data, ...state];

    default:
      return state;
  }
};

export default chatReducer;
