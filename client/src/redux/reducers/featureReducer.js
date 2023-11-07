const featureReducer = (state = "social", action) => {
  switch (action.type) {
    case "UPDATE_FEATURE":
      return action.payload;

    default:
      return state;
  }
};

export default featureReducer;
