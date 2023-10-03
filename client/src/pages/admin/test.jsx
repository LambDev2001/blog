import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState("");
  const handleChangeInput = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="bg-gray-300 p-2 w-[200px] m-auto">
      <input type="text" name="value" value={data} onChange={(e) => handleChangeInput(e)} />
      <button type="submit" className="bg-blue-500">Send</button>
    </form>
  );
};

export default Test;
