import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPopularBlogs } from "../redux/actions/blogAction";

import Card from "../components/blog/Card";

const Popular = () => {
  let blogs = useSelector((state) => state.blogReducer);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPopularBlogs());
  }, [dispatch]);

  blogs = blogs.reduce((accumulator, item) => {
    const { category } = item;
    if (!accumulator[category]) {
      accumulator[category] = [];
    }
    accumulator[category].push(item);
    return accumulator;
  }, {});

  return (
    <div>
      <div>
        {blogs &&
          Object.keys(blogs).map((nameCategory) => (
            <div key={nameCategory}>
              <div className={`${themeColor.border} text-3xl font-semibold my-1 border-t-2 cursor-pointer hover:text-blue-700`} onClick={() => history.push(`/category/${blogs[nameCategory][0].idCategory}`)}>
                {nameCategory.toUpperCase()}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {
                  blogs[nameCategory].map((blog, index) => {
                    if (index > 3) return <div></div>;
                    else {
                      return (
                        <div key={index}>
                          <Card blog={blog} />
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Popular;
