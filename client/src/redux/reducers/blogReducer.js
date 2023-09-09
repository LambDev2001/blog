const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return action.payload;
    case "GET_BLOG":
      return action.payload;
    case "CREATE_BLOG":
      return [...state, action.payload];
    case "UPDATE_BLOG":
      if(typeof(state.payload) === "object"){
      return state.status = action.payload.status
      }
      return state.map((item) => (item._id === action.payload._id ? action.payload : item));
    case "DELETE_BLOG":
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default blogReducer;
