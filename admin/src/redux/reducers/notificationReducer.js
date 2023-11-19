const notificationReducer = (state = { countBlogs: 0, countReports: 0 }, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS":
      return action.payload;

    case "UPDATE_NOTIFICATION":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default notificationReducer;
