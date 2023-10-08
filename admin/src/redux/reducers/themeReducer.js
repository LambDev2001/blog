const themeReducer = (
  state = {
    themeBtn: 0,
    themeColor: { outside: "bg-gray-200", inside: "bg-white", active: "bg-gray-400" },
    color : {
      main: "bg-[rgb(24,25,26)]",
      sub: `bg-[rgb(36,36,39)]`,
      input: `bg-[rgb(59,58,60)]`,
      border: `border-[rgb(57,59,58)]`,
      hover: `hover:bg-[rgb(59,58,60)]`,
      hoverBold: `hover:bg-[rgb(40,40,40)]`,
    }
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
