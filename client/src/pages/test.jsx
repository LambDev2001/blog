import React, { useState } from "react";
import { useSelector } from "react-redux";

const CreateBlog = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const error = validate(fieldName, value);
    const updatedErrors = { ...errors };
    updatedErrors[fieldName] = error;
    setErrors(updatedErrors);
  };

  const validate = (name, value) => {
    switch (name) {
      case "title":
        return value.length < 5 ? "Title is too short" : "";
      case "category":
        return value === "" ? "Please select a category" : "";
      case "description":
        return value.length < 10 ? "Description is too short" : "";
      case "thumbnail":
        return !value.startsWith("http") ? "Invalid URL" : "";
      default:
        return "";
    }
  };

  const handleSubmit = () => {
    // Check if there are any errors in the errors object.
    // If there are no errors, proceed with form submission.
    if (Object.values(errors).every((error) => error === "")) {
      // Perform form submission logic here
    } else {
      // Display error messages or prevent submission
      alert("Please correct the form errors");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={blog.title}
          onChange={(e) => handleChangeInput(e)}
          className={`${themeColor.input} text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}
        />
        <div className="text-red-500 text-sm">{errors.title}</div>
      </div>
      {/* Repeat the above pattern for other form fields */}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateBlog;
