import { getAPI } from "../../../utils/FetchData";
import ResErrorData from "../../../utils/ResErrorData";

export const getReport = (idReport, slug) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const report = await getAPI(`report/${idReport}`, slug);
    ResErrorData(report.data, dispatch);

    const date = new Date(report.data.createdAt);
    report.data.updatedAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    dispatch({ type: "LOADING", payload: { loading: false } });

    return report.data;
  } catch (err) {
    err.log({ err: err });
  }
};

export const getReports = (slug) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: { loading: true } });
    const report = await getAPI(`reports`, slug);
    ResErrorData(report.data, dispatch);

    const date = new Date(report.data.createdAt);
    report.data.updatedAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    dispatch({ type: "LOADING", payload: { loading: false } });
    return report.data;
  } catch (err) {
    err.log({ err: err });
  }
};
