const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_DASHBOARD":
      return action.payload;

    default:
      return state;
  }
};

export default dashboardReducer;
