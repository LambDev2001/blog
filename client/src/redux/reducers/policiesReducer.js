const policiesReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_POLICIES":
      return action.payload;
    case "CREATE_POLICY":
      return [...state, action.payload];
    case "UPDATE_POLICY":
      return state.map((item) =>
        item._id === action._id ? { ...item, name: action.payload.name } : item
      );
    case "DELETE_POLICY":
      return state.filter((item) => item._id !== action);
    default:
      return state;
  }
};

export default policiesReducer;
