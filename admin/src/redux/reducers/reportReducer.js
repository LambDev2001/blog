const reportReducer = (state = {report: null, reports: []}, action) => {
  switch (action.type) {
    case "GET_REPORT":
      return { report: action.payload, reports: state.reports };

    case "GET_REPORTS":
      return { report: state.report, reports: action.payload };

    case "ACCEPT_REPORT":
      const result = state.reports.filter((report) => report._id !== action.payload);
      return result;

    default:
      return state;
  }
};

export default reportReducer;
