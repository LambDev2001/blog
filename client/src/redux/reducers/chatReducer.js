const chatReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CHAT":
      return action.payload;

    case "SEND_CHAT":
      if (action.payload.data.idUser === action.payload.idUser) action.payload.data.owner = true;
      return [action.payload.data, ...state];

    default:
      return state;
  }
};

export default chatReducer;
