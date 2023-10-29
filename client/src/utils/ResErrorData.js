const ResErrorData = async (data, dispatch) => {
  if (data.err) {
    await dispatch({ type: "ALERT", payload: { type: "danger", msg: data.err } });
    return;
  }
  if (data.msg) {
    await dispatch({ type: "ALERT", payload: { type: "success", msg: data.msg } });
  }
};

export default ResErrorData;
