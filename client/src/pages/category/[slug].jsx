import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Card from "../../components/blog/Card";

import { getBlogsByCategory } from "../../redux/actions/blogAction";

const CategoryPage = () => {
  const [category, setCategory] = useState();
  const blogs = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const data = await dispatch(getBlogsByCategory(slug));
        setCategory(data);
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error fetching category:", error);
      }
    };

    getCategory();
  }, [dispatch, slug]);

  return (
    <div>
      {category && (
        <div className="my-2">
          <div className="text-3xl">{category.name.toUpperCase()}</div>
          <div className="border-b"></div>
        </div>
      )}
      <div className="flex flex-wrap m-1">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <div key={blog._id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-1">
              <Card blog={blog} />
            </div>
          ))}

          {
            blogs.length === 0 && (
              <div className="mx-auto my-4 text-2xl ">
                There are no blogs in this category
              </div>
            )
          }
      </div>
    </div>
  );
};

export default CategoryPage;
