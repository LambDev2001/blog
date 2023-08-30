import { getAPI, postAPI, patchAPI, deleteAPI } from "../../../utils/FetchData";
import ResErrorData from "../../../utils/ResErrorData";

export const createCategory = (name, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await postAPI("category", { name }, token);
    dispatch({ type: "CREATE_CATEGORY", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const getCategories = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });

    const res = await getAPI("categories", token);
    ResErrorData(res.data, dispatch);

    dispatch({ type: "GET_CATEGORIES", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const updateCategory = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    dispatch({ type: "UPDATE_CATEGORY", payload: data });
    const resData = await patchAPI(`category/${data._id}`, { name: data.name }, token);
    ResErrorData(resData.data, dispatch);
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const deleteCategory = (idCategory, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    dispatch({ type: "DELETE_CATEGORY", payload: idCategory });
    const resData = await deleteAPI(`category/${idCategory}`, token);
    ResErrorData(resData.data, dispatch);
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};
