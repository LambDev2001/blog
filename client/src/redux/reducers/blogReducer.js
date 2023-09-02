const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return action.payload;
    case "CREATE_BLOG":
      return [...state, action.payload];
    case "UPDATE_BLOG":
      return state.map((item) => (item._id === action.payload._id ? action.payload : item));
    case "DELETE_BLOG":
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default blogReducer;
