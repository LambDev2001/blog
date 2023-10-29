import ResErrorData from "../../utils/ResErrorData";
import { getAPI, postAPI, patchAPI, deleteAPI } from "../../utils/FetchData";

export const getAllPolicies = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI("all-policies", token);
    await ResErrorData(res.data, dispatch);

    if (res.data.length > 0) {
      res.data = res.data.map((item) => {
        const date = new Date(item.updatedAt);
        const dateFormat = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return { ...item, updatedAt: dateFormat };
      });
    }

    dispatch({ type: "GET_POLICIES", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const updatePolicy = (policy, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await patchAPI(`policy/${policy._id}`, policy, token);
    await ResErrorData(res.data, dispatch);

    dispatch({ type: "UPDATE_POLICY", payload: policy });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const createPolicy = (content, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await postAPI("policy", { content }, token);
    await ResErrorData(res.data, dispatch);
    res.data.updatedAt = new Date(res.data.updatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    dispatch({ type: "ALERT", payload: { type: "success", msg: "Policy created" } });
    dispatch({ type: "CREATE_POLICY", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const deletePolicy = (idPolicy, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await deleteAPI(`policy/${idPolicy}`, token);
    await ResErrorData(res.data, dispatch);

    dispatch({ type: "ALERT", payload: { type: "success", msg: "Policy deleted" } });

    dispatch({ type: "DELETE_POLICY", payload: idPolicy });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};
