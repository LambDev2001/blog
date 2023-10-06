const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return action.payload;

    case "GET_BLOG":
      return action.payload;

    case "CREATE_BLOG":
      return [{ ...state[0], ...action.payload }];

    case "UPDATE_BLOG":
      return action.payload;

    case "REMOVE_BLOG":
      const result = state.map((item) => {
        if (item._id === action.payload) {
          return {...item, isRemove: true};
        }
        return item;
      });
      return result;

    case "LIKE_BLOG":
      let resultLike = state.map((item) => {
        if (item._id === action.payload._id) {
          const isLikeChanged = action.payload.isLike !== item.isLike;
          if (!isLikeChanged) return item;
          return {
            ...item,
            isLike: true,
            likes: item.likes + 1,
            dislikes: item.dislikes + (item.isLike || item.isLike === null ? 0 : -1),
          };
        }
        return item;
      });

      return resultLike;

    case "DISLIKE_BLOG":
      let resultDislike = state.map((item) => {
        if (item._id === action.payload._id) {
          const isLikeChanged = action.payload.isLike !== item.isLike;
          if (!isLikeChanged) return item;
          return {
            ...item,
            isLike: false,
            likes: item.likes + (!item.isLike || item.isLike === null ? 0 : -1),
            dislikes: item.dislikes + 1,
          };
        }
        return item;
      });

      return resultDislike;

    case "FOLLOW_USER":
      return state.map((item) => {
        if (item.author._id === action.payload.idUser) {
          return { ...item, isFollowing: true };
        }
        return item;
      });

    case "INCREASE_SHARE":
      return state.map((item) => {
        if (item._id === action.payload.idBlog) {
          return { ...item, share: item.share + 1 };
        }
        return item;
      });

    case "DELETE_BLOG":
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default blogReducer;
