import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const Alert = () => {
  const [listAlert, setListAlert] = useState([]);
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alertReducer);
  useEffect(() => {
    if (Object.keys(alert).length > 0) {
      setListAlert((listAlert) => [...listAlert, alert]);
      dispatch({ type: "ALERT", payload: {} });
    }
  }, [alert, dispatch]);

  const handleClose = (index) => {
    setListAlert((listAlert) => listAlert.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const id = setInterval(() => {
      setListAlert((listAlert) => listAlert.filter((_, i) => i !== 0));
    }, 2000);

    return () => clearInterval(id);
  }, [listAlert]);

  return (
    <>
      <div className="sticky top-0" style={{ position: "relative" }}>
        {listAlert.map((alert, index) => {
          return (
            <div
              key={index}
              className={`toast bg-${alert.type}`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              style={{
                position: "absolute",
                top: index * 100,
                right: 0,
                display: "block",
                zIndex: 99999,
                backgroundColor: "white",
              }}>
              <div className={`toast-header bg-${alert.type}`}>
                <strong className="mr-auto">{alert.type}</strong>
                <button
                  type="button"
                  className="ml-2 mb-1 close"
                  data-dismiss="toast"
                  aria-label="Close"
                  onClick={() => handleClose(index)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="toast-body">{alert.msg}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Alert;
