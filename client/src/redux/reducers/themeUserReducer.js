const themeUserReducer = (
  state = {
    main: "bg-[rgb(24,25,26)]",
    sub: "bg-[rgb(36,36,39)]",
    input: "bg-[rgb(59,58,60)]",
    border: "border-[rgb(57,59,58)]",
    hover: "hover:bg-[rgb(59,58,60)]",
    hoverBold: "hover:bg-[rgb(40,40,40)]",
    text: "text-white",
  },
  action
) => {
  const color = {
    black: {
      main: "bg-[rgb(24,25,26)]",
      sub: "bg-[rgb(36,36,39)]",
      input: "bg-[rgb(59,58,60)]",
      border: "border-[rgb(57,59,58)]",
      hover: "hover:bg-[rgb(59,58,60)]",
      hoverBold: "hover:bg-[rgb(40,40,40)]",
      text: "text-white",
    },
    white: {
      main: "bg-[rgb(241,243,245)]",
      sub: "bg-[rgb(254,254,255)]",
      input: "bg-[rgb(241,243,245)]",
      border: "border-gray-300",
      hover: "hover:bg-gray-500",
      hoverBold: "hover:bg-gray-700",
      text: "text-black",
    },
  };

  switch (action.type) {
    case "GET_THEME_USER":
      return action.payload;
    case "CHANGE_THEME_USER":
      return color[action.payload];

    default:
      return state;
  }
};

export default themeUserReducer;
