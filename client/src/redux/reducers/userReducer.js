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

    case "REMOVE_FRIEND":
      return { ...state, friends: state.friends.filter((item) => item._id !== action.payload) };

    default:
      return state;
  }
};

export default userReducer;
