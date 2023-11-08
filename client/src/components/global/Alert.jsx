import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

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

  useEffect(() => {
    listAlert.map((alert, index) => {
      if (alert.type === "success") {
        toast.success(alert.msg, {
          style: {
            textJustify: "center",
            fontSize: "16px",
            padding: "10px",
            borderRadius: "10px",
            background: "rgba(85, 245, 68, 1)",
            color: "#fff",
          },
        });
      } else if (alert.type === "danger") {
        toast.error(alert.msg, {
          style: {
            textJustify: "center",
            fontSize: "16px",
            padding: "10px",
            borderRadius: "10px",
            background: "rgba(207, 52, 52, 1)",
            color: "#fff",
          },
        });
      }

      // Remove the alert from the list after displaying it
      setListAlert((prevAlerts) => prevAlerts.filter((item, itemIndex) => itemIndex !== index));
      return alert;
    });
  }, [listAlert]);

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={4}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "text-justify whitespace-nowrap",
        duration: 8000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  );
};

export default Alert;
