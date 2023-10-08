import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AdminRouteWrapper from "../../../utils/AdminRouteWrapper";
import { profileAdmin } from "../../../redux/actions/profileAction";
import Header from "../../../components/global/Header";
import Menu from "../../../components/Menu";
import ChangePass from "../../../components/global/ChangePass";

const Profile = () => {
  const { slug } = useParams();
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const token = useSelector((state) => state.authReducer.accessToken);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;
    const getInfoUser = async () => {
      const userInfo = await dispatch(profileAdmin(slug, token));
      setUser(userInfo);
    };
    getInfoUser();
  }, [slug, token, dispatch]);

  return (
    <div className="d-flex">
      <Menu />
      <div className="w-100">
        <div className="mx-2">
          <AdminRouteWrapper />
          <Header content="Profile" />

          <div className={`${color.outside} rounded-lg shadow-md`}>
            <div className="flex flex-wrap">
              <div className="m-2 flex-1 min-w-[400px]">
                {user && (
                  <div className={`${color.inside} rounded-lg shadow-slate-300 p-3 h-100`}>
                    <h2 className="text-2xl font-semibold mb-2">Information User</h2>
                    <div className="grid grid-cols-2 shadow-lg rounded-lg">
                      <span className="text-lg font-bold m-2 mx-3">Username:</span> {user.username}
                      <span className="text-lg font-bold m-2 mx-3">Account:</span> {user.account}
                      <span className="text-lg font-bold m-2 mx-3">Role:</span> {user.role}
                      <span
                        className="text-md font-bold m-2 mx-3 cursor-pointer text-blue-500 underline"
                        onClick={() => setModal(true)}>
                        Change password
                      </span>
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
              </div>
            </div>
          </div>

          {/* modal */}
          {modal && <ChangePass setModal={setModal} token={token} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
