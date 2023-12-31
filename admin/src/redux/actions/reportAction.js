import { getAPI, postAPI } from "../../utils/FetchData";
import ResErrorData from "../../utils/ResErrorData";

export const getNotification = (token) => async (dispatch) => {
  try {
    const res = await getAPI(`notifications`, token);
    ResErrorData(res.data, dispatch);
    dispatch({ type: "GET_NOTIFICATIONS", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getReport = (idReport, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const report = await getAPI(`report/${idReport}`, token);

    ResErrorData(report.data, dispatch);

    const date = new Date(report.data.createdAt);
    report.data.updatedAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // if (report.data.type === "comment") {
    //   dispatch({ type: "GET_COMMENTS", payload: report.data.comments });
    // }

    dispatch({ type: "GET_REPORT", payload: report.data });

    dispatch({ type: "LOADING", payload: { loading: false } });

    return report.data;
  } catch (err) {
    console.error(err);
  }
};

export const getReports = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const reports = await getAPI(`reports`, token);
    ResErrorData(reports.data, dispatch);

    const date = new Date(reports.data.createdAt);
    reports.data.updatedAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    dispatch({ type: "GET_REPORTS", payload: reports.data });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return reports.data;
  } catch (err) {
    console.error(err);
  }
};

export const declineReport = (idReport, token) => async (dispatch) => {
  try {
    const res = await postAPI(`decline-report/${idReport}`, "", token);
    await ResErrorData(res.data, dispatch);
  } catch (err) {
    console.error(err);
  }
};

export const acceptReport = (idReport, idAuthor, token) => async (dispatch) => {
  try {
    const res = await postAPI(`accept-report/${idReport}`, { idAuthor }, token);
    await ResErrorData(res.data, dispatch);
  } catch (err) {
    console.error(err);
  }
};
