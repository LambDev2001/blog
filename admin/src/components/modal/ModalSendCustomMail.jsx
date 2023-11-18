import React, { useState } from "react";
import { useDispatch } from "react-redux";

import validate from "../../utils/validate";
import { sendMail } from "../../redux/actions/userAction";

const ModalSendCustomMail = ({ to, token, handleOpen }) => {
  const [data, setData] = useState({
    subject: "",
    content: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    let error = validate(name, value);

    setErrors({ ...errors, [name]: error });
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let temptErr = {};
    for (const [name, value] of Object.entries(data)) {
      let error = validate(name, value);
      temptErr = { ...temptErr, [name]: error };
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }

    if (Object.values(temptErr).every((error) => error === "")) {
      dispatch(sendMail({ to, subject: data.subject, content: data.content, token }));
      handleOpen(null);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 shadow-lg`}
      style={{ backgroundColor: "rgba(179, 193, 159, 0.29)" }}>
      <form className={` p-4 rounded-lg shadow-lg w-[500px] bg-white text-black `}>
        <div className="text-2xl font-semibold">Send Custom Mail</div>

        <div
          className={` flex flex-col justify-center my-2 p-2 rounded-lg shadow-md overflow-hidden`}>
          <div className="flex flex-col my-2 w-100">
            <label htmlFor="subject" className="font-semibold text-xl mb-1">
              To
            </label>
            <input
              className={` px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              defaultValue={to}
              name="to"
              placeholder="Recipient..."
              disabled
            />
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="subject" className="font-semibold text-xl mb-1">
              Subject
            </label>
            <input
              className={`bg-[rgb(250,250,250)] px-3 py-2 rounded-md focus:outline-none`}
              type="text"
              value={data.subject}
              name="subject"
              onChange={(e) => handleChangeInput(e)}
              placeholder="Subject..."
            />
            <div className="text-red-500 text-md">{errors.subject}</div>
          </div>

          <div className="flex flex-col my-2 w-100">
            <label htmlFor="content" className="font-semibold text-xl mb-1">
              Message
            </label>
            <textarea
              className={`bg-[rgb(250,250,250)] px-3 py-2 rounded-md focus:outline-none`}
              value={data.content}
              name="content"
              cols={50}
              onChange={(e) => handleChangeInput(e)}
              placeholder="Compose email..."
              style={{ resize: "vertical", overflow: "auto" }}
            />
            <div className="text-red-500 text-md">{errors.content}</div>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-end">
          <button
            className="mx-2 py-2 px-3 bg-red-500 hover:bg-red-600 rounded-lg text-white"
            onClick={() => handleOpen(null)}>
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 py-2 px-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
            onClick={(e) => handleSubmit(e)}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalSendCustomMail;
