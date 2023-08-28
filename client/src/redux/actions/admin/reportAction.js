import { getAPI } from "../../../utils/FetchData";

export const getReport = (idReport, slug) => async (dispatch) => {
  try {
    const report = await getAPI(`report/${idReport}`, slug);
    if (report.err) {
      dispatch({ type: "ALERT", payload: { type: "danger", msg: report.err } });
    }

    const date = new Date(report.data.createdAt);
    report.data.updatedAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return report.data;
  } catch (err) {
    err.log({ err: err });
  }
};
