import ResErrorData from "../../../utils/ResErrorData";
import { getAPI, patchAPI } from "../../../utils/FetchData";

export const getAllPolicies = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await getAPI("all-policies", token);
    ResErrorData(res.data, dispatch);

    res.data = res.data.map((item) => {
      const date = new Date(item.updatedAt);
      const dateFormat = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return { ...item, updatedAt: dateFormat };
    });

    dispatch({ type: "GET_POLICIES", payload: res.data });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};

export const updatePolicy = (policy, status, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const res = await patchAPI(`status-policy/${policy._id}`, { ...policy, status }, token);
    ResErrorData(res.data, dispatch);
    console.log(res.data)
    dispatch({ type: "UPDATE_POLICY", payload: {...policy, status} });
    dispatch({ type: "LOADING", payload: { loading: false } });
  } catch (err) {
    console.error(err);
  }
};
