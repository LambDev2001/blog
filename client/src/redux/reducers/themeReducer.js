const themeReducer = (
  state = {
    themeBtn: 0,
    themeColor: { outside: "bg-gray-200", inside: "bg-white", active: "bg-gray-400" },
  },
  action
) => {
  switch (action.type) {
    case "GET_THEME":
      return action.payload;
    case "UPDATE_THEME":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default themeReducer;
