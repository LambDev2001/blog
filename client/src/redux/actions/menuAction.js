import { getAPI } from "../../utils/FetchData";

export const getMenu = () => (dispatch) => {
  try {
    dispatch({ type: "GET_MENU" });
  } catch (err) {
    console.error(err);
  }
};

export const updateMenu = (status) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_MENU", payload: status });
  } catch (err) {
    console.error(err);
  }
};

export const searchAll =
  ({ value, type, token }) =>
  async (dispatch) => {
    try {
      const res = await getAPI(`search-${type}?search=${value}`, token);
      return res.data
    } catch (err) {
      console.error(err);
    }
  };
