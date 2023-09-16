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
    <div className="mx-2">
      <AdminRouteWrapper />
      <Header />
      <div className="bg-gray-200 rounded-lg shadow-md">
        <div className="flex flex-wrap">
          <div className="m-2 flex-1 min-w-[400px]">
            {user && (
              <div className="bg-white rounded-lg shadow-slate-300 p-3">
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
                <div className="p-3 h-100 bg-white rounded-lg shadow-md">
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
            <div className="flex-2">
              {user && (
                <div className="bg-white rounded-lg shadow-md p-4">
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
        <div className="bg-gray-200 rounded-lg shadow-md p-1">
          <div className="bg-white rounded-lg shadow-md m-2">
            <div className="content p-2">Blogs ({user.blogs.length})</div>
            <div className="d-flex flex-wrap justify-around mx-4">
              {user.blogs.map((blog) => (
                <Card blog={blog} key={blog._id} />
              ))}
            </div>
          </div>
        </div>
      )}

      <hr className="my-3 mx-2" />

      {user.reports && (
        <div className="bg-gray-200 rounded-lg shadow-md p-1">
          <div className="bg-white rounded-lg shadow-md m-2 p-2">
            <div className="content">Reports ({user.reports.length})</div>
            {user.reports.length > 0 && <TableReport data={user.reports} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
