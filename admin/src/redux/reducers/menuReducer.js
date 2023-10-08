const menuReducer = (state = false, action) => {
  switch (action.type) {
    case "GET_MENU":
      return state;
    case "UPDATE_MENU":
      return action.payload;

    default:
      return state;
  }
};

export default menuReducer;
