const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;

    case "UPDATE_AVATAR":
      const result = { ...state, user: { ...state.user, ...action.payload } };
      return result;

    case "UPDATE_USER":
      return { ...state, user: action.payload };      
    default:
      return state;
  }
};

export default authReducer;
