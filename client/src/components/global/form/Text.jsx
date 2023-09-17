import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Text = ({ name, type, value, onChange }) => {
  const [hidePass, setHidePass] = useState(true);
  switch (type) {
    case "show":
      return (
        <div className="form-group mt-3">
          <label className="form-label">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
          <input className="bg-white form-control" value={value} disabled />
        </div>
      );

    case "password":
      return (
        <div className="form-group mb-3">
          <label htmlFor={value} className="form-label">
            {name}
          </label>
          <div className="d-flex position-relative">
            <input
              type={hidePass ? "password" : "text"}
              className="bg-white"
              id={value}
              name={value}
              onChange={onChange}
            />
            <div
              className="position-absolute"
              style={{ top: " 50%", transform: "translateY(-50%)", right: "10px" }}>
              {hidePass ? (
                <AiOutlineEyeInvisible onClick={() => setHidePass(!hidePass)} />
              ) : (
                <AiOutlineEye onClick={() => setHidePass(!hidePass)} />
              )}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="form-group mb-3">
          <label htmlFor={value} className="form-label">
            {name}
          </label>
          <input type="text" className="bg-white form-control" id={value} name={value} onChange={onChange} />
        </div>
      );
  }
};

export default Text
