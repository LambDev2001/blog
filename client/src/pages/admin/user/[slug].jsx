import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AdminRouteWrapper from "../../../utils/AdminRouteWrapper";
import { getUser } from "../../../redux/actions/userAction";
import Friend from "../../../components/global/Friend";
import Header from "../../../components/global/Header";
import Card from "../../../components/global/Card";
import TableReport from "../../../components/admin/TableReport";

const User = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getUser(slug, token));
  }, [slug, dispatch, token]);

  return (
    <div className="w-100">
      <AdminRouteWrapper />
      <Header />
      <div className="m-2 shadow-element border-element radius-element">
        <div className="flex flex-wrap">
          <div className="px-2 m-2">
            {user && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <span>Username: {user.username}</span>
                  <span>Account: {user.account}</span>
                  <span>Status: {user.status}</span>
                  <span>Day create: {user.createdAt}</span>
                  <span>Violation: {user.report}</span>
                </div>
              </div>
            )}
          </div>

          {/* avatar */}
          <div className="px-2 m-2">
            {user && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2">Avatar</h2>
                <img
                  className="rounded-full mx-auto mb-4"
                  src={user.avatar}
                  alt="User Avatar"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}
          </div>

          {/* friend */}
          <div className="px-2 m-2">
            {user && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <Friend friends={user.friends} />
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="my-3 mx-2" />
      {user.blogs && (
        <div className="m-2 shadow-element border-element radius-element">
          <div className="content p-2">Blogs ({user.blogs.length})</div>
          <div className="d-flex flex-wrap justify-around mx-4">
            {user.blogs.map((blog) => (
              <Card blog={blog} key={blog._id} />
            ))}
          </div>
        </div>
      )}

      {user.reports && (
        <div>
          <div className="content p-2">Reports ({user.reports.length})</div>
          {user.reports.length > 0 && <TableReport data={user.reports} />}
        </div>
      )}
    </div>
  );
};

export default User;
