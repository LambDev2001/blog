const friendReducer = (state = { req: [], friend: [] }, action) => {
  switch (action.type) {
    case "GET_REQUEST":
      return { req: action.payload, friend: state.friend };
    case "GET_FRIEND":
      return { req: state.req, friend: action.payload };

    case "ACCEPT":
      const newFriend = state.req.filter((item) => item._id === action.payload);
      const friend = [...state.friend, newFriend[0]].sort((a, b)=> a.username.localeCompare(b.username));

      return {
        req: state.req.filter((item) => item._id !== action.payload),
        friend,
      };

    case "DECLINE":
      return { req: state.req.filter((item) => item._id !== action.payload), friend: state.friend };

    default:
      return state;
  }
};

export default friendReducer;
