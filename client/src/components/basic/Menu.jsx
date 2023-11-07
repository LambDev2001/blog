import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { BiHomeAlt2 } from "react-icons/bi";
import { LiaExclamationCircleSolid } from "react-icons/lia";
import { BsArrowUpRightCircle, BsTranslate } from "react-icons/bs";
import { SlPeople, SlUserFollowing } from "react-icons/sl";
import { IoShareSocial } from "react-icons/io5";

import { getCategories } from "../../redux/actions/categoryAction";

const Menu = () => {
  const [isMore, setIsMore] = useState(false);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const categories = useSelector((state) => state.categoryReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const height = window.innerHeight - 80;
  useEffect(() => {
    dispatch(getCategories(token));
  }, [dispatch, token]);

  const handleShowCategory = () => {
    setIsMore(!isMore);
  };

  const handleFeature = (value) => {
    dispatch({ type: "UPDATE_FEATURE", payload: value });
  };

  return (
    <div className={`${themeColor.text}`} style={{ height: `${height}px` }}>
      <div className="ml-2 mt-2">
        <div className="text-lg">Pages</div>

        <div
          className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push("/")}>
          <BiHomeAlt2 size={26} className="ml-2 mr-4" />
          <div className="my-auto">Home</div>
        </div>
        <div
          className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push("/popular")}>
          <BsArrowUpRightCircle size={26} className="ml-2 mr-4" />
          <div className="my-auto">Popular</div>
        </div>

        <div
          className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push(`/friend`)}>
          <SlPeople size={26} className="ml-2 mr-4" />
          <div className="my-auto">Friend</div>
        </div>

        <div
          className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push(`/following`)}>
          <SlUserFollowing size={26} className="ml-2 mr-4" />
          <div className="my-auto">Following</div>
        </div>

        {/* Category */}
        <div className="text-lg">Categories</div>
        {categories.length > 0 &&
          categories.map((category, index) => {
            if (index < 3 || isMore) {
              return (
                <div
                  key={index}
                  className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
                  onClick={() => history.push(`/category/${category._id}`)}>
                  <div className="my-auto">{category.name}</div>
                </div>
              );
            } else {
              return null;
            }
          })}
        {isMore ? (
          <div className="flex justify-content-center mt-3">
            <div
              className={`${themeColor.sub} ${themeColor.border} border-1 shadow-md mx-auto p-2 rounded-full cursor-pointer`}
              onClick={handleShowCategory}>
              Show Less
            </div>
          </div>
        ) : (
          <div className="flex justify-content-center mt-3">
            <div
              className={`${themeColor.sub} ${themeColor.border} border-1 shadow-md mx-auto p-2 rounded-full cursor-pointer`}
              onClick={handleShowCategory}>
              Show More
            </div>
          </div>
        )}

        {/* Feature */}
        <div className="text-lg">Feature</div>
        <div
          className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => handleFeature("social")}>
          <IoShareSocial size={26} className="ml-2 mr-4" />
          <div className="my-auto">Social</div>
        </div>
        <div
          className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => handleFeature("translate")}>
          <BsTranslate size={26} className="ml-2 mr-4" />
          <div className="my-auto">Translate</div>
        </div>

        {/* resource */}
        <div className="text-lg">Resources</div>
        <div
          className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push("/about")}>
          <LiaExclamationCircleSolid size={26} className="ml-2 mr-4" />
          <div className="my-auto">About</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
