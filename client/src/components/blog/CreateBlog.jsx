import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoMdClose } from "react-icons/io";
import { BsImage } from "react-icons/bs";

import Blog from "./BlogCard";
import { createBlog } from "../../redux/actions/blogAction";
import { getCategories } from "../../redux/actions/categoryAction";
import validate from "../../utils/validate";

const CreateBlog = () => {
  const [isReview, setIsReview] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const categories = useSelector((state) => state.categoryReducer);
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories(token));
  }, [dispatch, token]);

  const handleShowReview = () => {
    setIsReview(!isReview);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
    if (name === "category") {
      categories.map((item) => {
        if (item._id === value) setNameCategory(item.name);
        return item;
      });
    }

    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setBlog({ ...blog, thumbnail: imageUrl });
    setThumbnail(file);
  };

  const handleSubmit = () => {
    let temptErr = {};
    for (const [name, value] of Object.entries(blog)) {
      const error = validate(name, value);
      temptErr = { ...temptErr, [name]: error };
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }

    if (Object.values(temptErr).every((error) => error === "")) {
      dispatch(createBlog(blog, thumbnail, token));
    }
  };

  return (
    <div className="mx-auto">
      {/* input info */}
      <div className={`${themeColor.sub} w-100 my-2 p-4 rounded-lg text-white shadow-md`}>
        <h1 className="text-2xl font-semibold mb-4">Create Blog</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            value={blog.title}
            onChange={(e) => handleChangeInput(e)}
            className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}
          />
          <div className="text-red-500 text-md">{errors.title}</div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            name="description"
            value={blog.description}
            onChange={(e) => handleChangeInput(e)}
            className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}
          />
          <div className="text-red-500 text-md">{errors.description}</div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Category</label>
          <select
            name="category"
            value={blog.category}
            onChange={(e) => {
              handleChangeInput(e);
            }}
            className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}>
            <option value="">Select a category</option>
            {categories.length > 0 &&
              categories.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          <div className="text-red-500 text-md">{errors.category}</div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Thumbnail</label>
          <div className="w-1/4 max-w-[200px] h-100 my-2">
            {blog.thumbnail && (
              <img src={blog.thumbnail} alt="thumbnail" className="w-100 rounded-md" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
            multiple
          />
          <label htmlFor="imageUpload" className="my-auto mx-2 cursor-pointer rounded-md">
            <BsImage size={24} />
          </label>

          <div className="text-red-500 text-md">{errors.thumbnail}</div>
        </div>

        <div className=" flex justify-end">
          <div className={`${themeColor.input} rounded-lg`} onClick={handleShowReview}>
            {isReview ? <div></div> : <div className="py-2 px-3 cursor-pointer">See review</div>}
          </div>
        </div>
      </div>

      {/* Review */}
      {isReview && (
        <div className={`${themeColor.sub} my-3 p-4 rounded-lg`}>
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold my-4">Review</h1>
            <IoMdClose
              color="white"
              size={24}
              className="my-4 cursor-pointer"
              onClick={handleShowReview}
            />
          </div>

          {/* description, interact and thumbnail */}
          <div className="flex flex-wrap justify-between">
            <div className="w-3/4">
              {/* title */}
              <div className="flex">
                <div className="my-1 text-lg font-bold">{blog.title}</div>
                <div className={`${themeColor.input} mx-2 p-2 rounded-full`}>{nameCategory}</div>
              </div>

              {/* description */}
              <div className="my-1 text-md">{blog.description}</div>
            </div>

            {/* thumbnail */}
            <div className="w-1/4 max-w-[200px] h-100">
              {blog.thumbnail ? (
                <img src={blog.thumbnail} alt="thumbnail" className="w-100 rounded-md" />
              ) : (
                <div className="w-100 h-full flex justify-center align-middle border-1 border-gray-400">
                  None
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`${themeColor.sub} pt-3 rounded-lg`}>
        <h1 className="text-2xl font-semibold mb-3 mx-4">Content</h1>
        <Blog blog={blog} setBlog={setBlog} />
        <div className="mx-4 py-2 text-red-500 text-md">{errors.content}</div>
      </div>

      {/* Send button */}
      <div className="flex justify-end">
        <button className="btn btn-primary my-4 px-4 py-2" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
