const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;

    case "UPDATE_AVATAR":
      const result = { ...state, user: { ...state.user, ...action.payload } };
      return result;
      
    default:
      return state;
  }
};

export default authReducer;
