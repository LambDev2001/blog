import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Friend from "../../components/global/Friend";
import Header from "../../components/global/Header";
import Card from "../../components/global/Card";
import TableReport from "../../components/TableReport";
import Button from "../../components/global/theme/button/Button";
import { getUser, changeStatus } from "../../redux/actions/userAction";
import AdminRouteWrapper from "../../utils/AdminRouteWrapper";

const User = () => {
  const [openAction, setOpenAction] = useState(false);
  const token = useSelector((state) => state.authReducer.accessToken);
  const user = useSelector((state) => state.userReducer);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(slug, token));
  }, [slug, dispatch, token]);

  const upStatus = () => {
    setOpenAction(false);
    dispatch(changeStatus(user._id, user.status + 1, token));
  };

  const downStatus = () => {
    setOpenAction(false);
    dispatch(changeStatus(user._id, user.status - 1, token));
  };

  return (
    <div>
      <AdminRouteWrapper />
      <Header content="Manager User" />

      {/* action btn */}
      <div className="sticky top-[110px] z-[900] flex justify-end items-center space-x-2 cursor-pointer h-0">
        {openAction && (
          <div className={`${color.inside} p-2 rounded-lg shadow-md border-element`}>
            <Button text="Down Status" color={0} onClick={downStatus} />
            <Button text="Up Status" color={3} onClick={upStatus} />
          </div>
        )}
        <div
          className="rounded-full bg-cyan-400 p-3 m-2 h-[60px] w-[60px] text-center flex justify-center items-center"
          onClick={() => setOpenAction(!openAction)}>
          <span className="text-white font-semibold">Action</span>
        </div>
      </div>

      <div className={`${color.outside} rounded-lg shadow-md`}>
        <div className="flex flex-wrap">
          <div className="m-2 flex-1 min-w-[400px]">
            {user && (
              <div className={`${color.inside} rounded-lg shadow-slate-300 p-3`}>
                <h2 className="text-2xl font-semibold mb-2">Information User</h2>
                <div className="grid grid-cols-2 shadow-lg rounded-lg">
                  <span className="text-lg font-bold m-2 mx-3">Username:</span> {user.username}
                  <span className="text-lg font-bold m-2 mx-3">Account:</span> {user.account}
                  <span className="text-lg font-bold m-2 mx-3">Status:</span> {user.status}
                  <span className="text-lg font-bold m-2 mx-3">Day create:</span> {user.createdAt}
                  <span className="text-lg font-bold m-2 mx-3">Violation:</span> {user.report}
                </div>
              </div>
            )}
          </div>

          {/* avatar */}
          <div className="m-2 flex-1 flex flex-wrap justify-content-around">
            <div className="flex-3 min-w-[300px]">
              {user && (
                <div className={`${color.inside} p-3 h-100 rounded-lg shadow-md`}>
                  <h2 className="text-lg font-semibold mb-2">Avatar</h2>
                  <img
                    className="rounded-full mx-auto"
                    src={user.avatar}
                    alt="User Avatar"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              )}
            </div>

            {/* friend */}
            <div className="flex-2 my-2">
              {user && (
                <div className={`${color.inside} rounded-lg shadow-md p-4`}>
                  <h2 className="text-lg font-semibold mb-2">Friend</h2>
                  <Friend friends={user.friends} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-3 mx-2" />

      {user.blogs && (
        <div className={`${color.outside} rounded-lg shadow-md p-1`}>
          <div className={`${color.inside} rounded-lg shadow-md m-2`}>
            <div className="content p-2">Blogs ({user.blogs.length})</div>
            <div className="d-flex flex-wrap justify-around mx-auto">
              {user.blogs.map((blog) => (
                <div className="sm:w-1 md:w-1/2 lg:w-1/3">
                  <Card blog={blog} key={blog._id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <hr className="my-3 mx-2" />

      {user.reports && (
        <div className={`${color.outside} rounded-lg shadow-md p-1`}>
          <div className={`${color.inside} rounded-lg shadow-md m-2 p-2`}>
            <div className="content">Reports ({user.reports.length})</div>
            {user.reports.length > 0 && <TableReport data={user.reports} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
