import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Test = () => {
  const [listAlert, setListAlert] = useState([
    {
      type: "success",
      msg: "Success",
    },
    {
      type: "error",
      msg: "Error",
    },
  ]);

  useEffect(() => {
    listAlert.map((alert, index) => {
      if (alert.type === "success") {
        toast.success(alert.msg, {
          style: {
            fontSize: "16px",
            padding: "10px",
            borderRadius: "10px",
            background: "rgba(85, 245, 68, 1)",
            color: "#fff",
          },
        });
      } else if (alert.type === "error") {
        toast.error(alert.msg, {
          style: {
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
    <div className="flex flex-col">
      <button
        className="btn "
        onClick={() => setListAlert([...listAlert, { type: "success", msg: "Success" }])}>
        Add data
      </button>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={4}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default Test;
