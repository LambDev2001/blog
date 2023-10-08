const ResErrorData = (data, dispatch) => {
  if (data.err) {
    dispatch({ type: "ALERT", payload: { type: "danger", msg: data.err } });
    dispatch({ type: "LOADING", payload: { loading: false } });
    return;
  }
};

export default ResErrorData;
