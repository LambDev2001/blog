import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../redux/actions/categoryAction";
import AdminRouteWrapper from "../utils/AdminRouteWrapper";
import Header from "../components/global/Header";
import Button from "../components/global/theme/button/Button";
import Menu from "../components/Menu";

const Categories = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);
  const token = useSelector((state) => state.authReducer.accessToken);
  const categories = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name };
      dispatch(updateCategory(data, token));
    } else {
      dispatch(createCategory(name, token));
    }
    setName("");
    setEdit(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this category?")) {
      dispatch(deleteCategory(id, token));
    }
  };
  return (
    <div className="d-flex">
      <Menu />
      <div className="w-100">
        <div className="m-2">
          <AdminRouteWrapper />
          <Header content="Manager Categories" />
          <div className="d-flex justify-center">
            <div className="w-50">
              <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center">
                  {edit && (
                    <i className="" style={{ cursor: "pointer" }} onClick={() => setEdit(null)} />
                  )}
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="category"
                    id="category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Button text={edit ? "Update" : "Create"} color={2} type="submit" />
                </div>
              </form>

              <div>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <div
                      className="flex items-center justify-between border border-solid border-black-700 rounded-lg p-2 my-2 
                hover:scale-110 transition-all duration-300"
                      key={category._id}>
                      <p className="text-capitalize">{category.name}</p>
                      <div className="flex">
                        <div className="flex items-center">
                          <AiOutlineEdit
                            className="mr-2 cursor-pointer"
                            onClick={() => setEdit(category)}
                          />
                          <AiOutlineDelete
                            className="cursor-pointer"
                            onClick={() => handleDelete(category._id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
