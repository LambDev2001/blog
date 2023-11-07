const mainTheme = (state="white", action) => {
  switch (action.type) {
    case "UPDATE_MAIN_THEME":
      return action.payload;
    default:
      return state;
  }
};

export default mainTheme