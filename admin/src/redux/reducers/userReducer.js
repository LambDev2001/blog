const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;

    case "UPDATE_USER":
      return { ...state, ...action.payload };

    case "UN_FOLLOW_USER":
      return {
        ...state,
        following: state.following.filter((item) => item._id !== action.payload),
      };

    case "BAN":
      return { ...state, ban: action.payload };

    case "UN_BAN":
      return { ...state, ban: "" };

    default:
      return state;
  }
};

export default userReducer;
