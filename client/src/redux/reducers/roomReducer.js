const roomReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ROOMS":
      return action.payload;

    case "CREATE_ROOM":
      return [...state, action.payload].sort((a, b) => a.nameRoom.localeCompare(b.nameRoom));

    case "DELETE_ROOM":
      const result = state.filter((item) => item._id !== action.payload._id);
      return result;

    case "INCREASE_MEMBER":
      return state.map((item) => {
        if (item._id === action.payload.idRoom) {
          return { ...item, member: [...item.member, action.payload.user._id] };
        }
        return item;
      });

    case "DECREASE_MEMBER":
      return state.map((item) => {
        if (item._id === action.payload.idRoom) {
          const member = item.member.filter((id) => id !== action.payload.user._id);
          return { ...item, member };
        }
        return item;
      });

    default:
      return state;
  }
};
export default roomReducer;
