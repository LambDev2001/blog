const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOADING":
      return action.payload;
    default:
      return state;
  }
}

export default alertReducer