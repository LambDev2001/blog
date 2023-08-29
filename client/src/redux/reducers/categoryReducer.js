const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return action.payload;

    case "CREATE_CATEGORIES":
      return [action.payload, ...state];

    case "UPDATE_CATEGORY":
      return state.map((item) =>
        item._id === action.payload._id ? { ...item, name: action.payload.name } : item
      );

    case "DELETE_CATEGORY":
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default categoryReducer;
