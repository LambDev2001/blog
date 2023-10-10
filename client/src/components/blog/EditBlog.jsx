import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoMdClose } from "react-icons/io";

import Blog from "./BlogCard";
import { getRooms } from "../../redux/actions/roomAction";
import { updateBlog } from "../../redux/actions/blogAction";
import { getCategories } from "../../redux/actions/categoryAction";

const EditBlog = () => {
  const [isReview, setIsReview] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const categories = useSelector((state) => state.categoryReducer);
  const blog = useSelector((state) => state.blogReducer);
  const [dataBlog, setDataBlog] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(token));
    dispatch(getCategories(token));
    if (blog[0] !== undefined) {
      setDataBlog(blog[0]);
    }
  }, [dispatch, token, blog]);

  const handleShowReview = () => {
    setIsReview(!isReview);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDataBlog({ ...dataBlog, [name]: value });
    if (name === "category") {
      categories.map((item) => {
        if (item._id === value) setNameCategory(item.name);
        return item;
      });
    }
  };

  const handleSubmit = () => {
    dispatch(updateBlog(blog[0]._id, dataBlog, token));
  };

  return (
    <div className="mx-auto">
      {/* input info */}
      <div className={`${themeColor.sub} w-100 my-2 p-4 rounded-lg text-white shadow-md`}>
        <h1 className="text-2xl font-semibold mb-4">Edit Blog</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            value={dataBlog.title}
            onChange={(e) => handleChangeInput(e)}
            className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            name="description"
            value={dataBlog.description}
            onChange={(e) => handleChangeInput(e)}
            className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Category</label>
          <select
            name="category"
            value={dataBlog.category}
            onChange={(e) => {
              handleChangeInput(e);
            }}
            className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}>
            <option value={dataBlog.idCategory}>{dataBlog.category}</option>
            {categories.length > 0 &&
              categories.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Thumbnail</label>
          <input
            type="text"
            placeholder="Enter thumbnail URL"
            name="thumbnail"
            value={dataBlog.thumbnail}
            onChange={(e) => handleChangeInput(e)}
            className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}
          />
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
                <div className="my-1 text-lg font-bold">{dataBlog.title}</div>
                <div className={`${themeColor.input} mx-2 p-2 rounded-full`}>{nameCategory.length > 0 ? nameCategory : dataBlog.category}</div>
              </div>

              {/* description */}
              <div className="my-1 text-md">{dataBlog.description}</div>
            </div>

            {/* thumbnail */}
            <div className="w-1/4 max-w-[200px] h-100">
              {blog.thumbnail ? (
                <img src={dataBlog.thumbnail} alt="thumbnail" className="w-100 rounded-md" />
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
        <Blog blog={dataBlog} setBlog={setDataBlog} />
      </div>

      {/* Send button */}
      <div className="flex justify-end">
        <button className="btn btn-primary my-4 px-4 py-2" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBlog;
