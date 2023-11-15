const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;
    case "UPDATE_AUTH":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
};

export default authReducer;
