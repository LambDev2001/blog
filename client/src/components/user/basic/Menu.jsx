import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { BiHomeAlt2 } from "react-icons/bi";
import { LiaExclamationCircleSolid, LiaQuestionCircleSolid } from "react-icons/lia";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";
import { getCategories } from "../../../redux/actions/categoryAction";

const Menu = () => {
  const [isMore, setIsMore] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const categories = useSelector((state) => state.categoryReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const height = window.innerHeight - 60;
  useEffect(() => {
    dispatch(getCategories(token));
  }, [dispatch, token]);

  const handleShowCategory = () => {
    setIsMore(!isMore);
  };

  return (
    <div className={`${themeColor.border} w-1/5 border-r`} style={{ height: `${height}px` }}>
      <div className="ml-2 mt-2">
        <div
          className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push("/user/home")}>
          <BiHomeAlt2 size={26} className="ml-2 mr-4" />
          <div className="my-auto">Home</div>
        </div>
        <div
          className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push("/user/popular")}>
          <BsArrowUpRightCircle size={26} className="ml-2 mr-4" />
          <div className="my-auto">Popular</div>
        </div>

        <div
          className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push(`/user/friends/${user._id}`)}>
          <SlPeople size={26} className="ml-2 mr-4" />
          <div className="my-auto">Friend</div>
        </div>

        {/* Category */}
        <div className="text-lg">Categories</div>
        {categories.length > 0 &&
          categories.map((category, index) => {
            if (index < 3 || isMore) {
              return (
                <div
                  key={index}
                  className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
                  onClick={() => history.push(`/user/category/${category._id}`)}>
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
              className={`${themeColor.sub} mx-auto p-2 rounded-full cursor-pointer`}
              onClick={handleShowCategory}>
              Show Less
            </div>
          </div>
        ) : (
          <div className="flex justify-content-center mt-3">
            <div
              className={`${themeColor.sub} mx-auto p-2 rounded-full cursor-pointer`}
              onClick={handleShowCategory}>
              Show More
            </div>
          </div>
        )}

        {/* resource */}
        <div className="text-lg">Resources</div>
        <div
          className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push("/user/about")}>
          <LiaExclamationCircleSolid size={26} className="ml-2 mr-4" />
          <div className="my-auto">About</div>
        </div>
        <div
          className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
          onClick={() => history.push("/user/help")}>
          <LiaQuestionCircleSolid size={26} className="ml-2 mr-4" />
          <div className="my-auto">Help</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
