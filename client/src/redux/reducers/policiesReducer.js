const policiesReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_POLICIES":
      return action.payload;
    case "CREATE_POLICY":
      return [...state, action.payload];
    case "UPDATE_POLICY":
      return state.map((item) => (item._id === action.payload._id ? action.payload : item));
    case "DELETE_POLICY":
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default policiesReducer;
