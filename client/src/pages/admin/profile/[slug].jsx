import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AdminRouteWrapper from "../../../utils/AdminRouteWrapper";
import { profileAdmin } from "../../../redux/actions/profileAction";
import Header from "../../../components/global/Header";
import ChangePass from "../../../components/global/ChangePass";

const Profile = () => {
  const { slug } = useParams();
  const token = useSelector((state) => state.authReducer.accessToken);
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;
    const getInfoUser = async () => {
      const user = await dispatch(profileAdmin(slug, token));

      setUser(user.data);
    };
    getInfoUser();
  }, [slug, token, dispatch]);

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
                  <span className="text-lg font-bold m-2 mx-3">Role:</span> {user.role}
                  <span className="text-lg font-bold m-2 mx-3" onClick={() => setModal(true)}>
                    <div className="text-blue underline">Change password</div>
                  </span>
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
          </div>
        </div>
      </div>

      {/* modal */}
      {modal && <ChangePass setModal={setModal} token={token} />}
    </div>
  );
};

export default Profile;
