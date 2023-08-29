import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

import { createCategory, getCategories, updateCategory, deleteCategory } from "../../redux/actions/admin/categoryAction"

const Categories = () => {
  const [name, setName] = useState('');
  const [edit, setEdit] = useState({ _id: '', name: '' })
  const token = useSelector(state => state.authReducer.accessToken)
  const categories = useSelector(state => state.categoryReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories(token))
  }, [dispatch, token])

  useEffect(() => {
    if (edit) setName(edit.name)
  }, [edit])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token || !name) return;

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
    if (!token) return;
    if (window.confirm("Are you sure to delete this category?")) {
      dispatch(deleteCategory(id, token));
    }
  };

  return (
    <div className="category">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>

        <div className="d-flex align-items-center">
          {edit && (
            <i
              className="fas fa-times me-2 text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => setEdit(null)}
            />
          )}
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="btn" type="submit">{edit ? "Update" : "Create"}</button>
        </div>
      </form>

      <div>
        { categories.length > 0 &&
        categories.map((category) => (
          <div className="category_row" key={category._id}>
            <p className="m-0 text-capitalize">{category.name}</p>

            <div>
              <AiOutlineEdit className='mx-2' onClick={() => setEdit(category)} />

              <AiOutlineDelete className='mx-2' onClick={() => handleDelete(category._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Categories