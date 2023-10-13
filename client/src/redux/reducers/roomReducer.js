const roomReducer = (state=[], action) => {
  switch (action.type) {
    case "GET_ROOMS":
      return action.payload

    case "CREATE_ROOM":
      return [...state, action.payload].sort((a, b) => a.nameRoom.localeCompare(b.nameRoom))

    default:
      return state
  }
};
export default roomReducer
