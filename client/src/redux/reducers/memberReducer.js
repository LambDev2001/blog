const memberReducer = (state = [], action) => {
  let result = [];
  switch (action.type) {
    case "GET_MEMBERS":
      return action.payload;

    case "ADD_MEMBER":
      result = [...state, action.payload].sort();
      return result;

    case "KICK_MEMBER":
      result = state.filter((item) => item._id !== action.payload);
      return result;

    default:
      return state;
  }
};

export default memberReducer;
