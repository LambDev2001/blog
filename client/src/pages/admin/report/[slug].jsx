import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../../components/global/Header";
import InfoBlog from "../../../components/global/InfoBlog";
import Blog from "../../../components/global/Blog";
import Button from "../../../components/global/theme/button/Button";
import AdminRouteWrapper from "../../../utils/AdminRouteWrapper";
import { acceptReport, declineReport, getReport } from "../../../redux/actions/reportAction";

const Report = () => {
  const [openAction, setOpenAction] = useState(false);
  const report = useSelector((state) => state.reportReducer.report);
  const token = useSelector((state) => state.authReducer.accessToken);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const history = useHistory();
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReport(slug, token));
  }, [dispatch, slug, token]);
  console.log(report);

  const handleViolate = () => {
    dispatch(acceptReport(report._id, token));
    history.goBack();
  };

  const handleNotViolate = () => {
    dispatch(declineReport(report._id, token));
    history.goBack();
  };

  return (
    <div className="mx-2">
      <AdminRouteWrapper />
      <Header />

      {/* action btn */}
      <div className="sticky top-[110px] z-[900] flex justify-end items-center space-x-2 cursor-pointer h-0">
        {openAction && (
          <div className={`${color.inside} p-2 rounded-lg shadow-md border-element`}>
            <Button text="Violate" color={0} onClick={handleViolate} />
            <Button text="Not Violate" color={3} onClick={handleNotViolate} />
          </div>
        )}
        <div
          className="rounded-full bg-cyan-400 p-3 m-2 h-[60px] w-[60px] text-center flex justify-center items-center"
          onClick={() => setOpenAction(!openAction)}>
          <span className="text-white font-semibold">Action</span>
        </div>
      </div>

      {/* info report */}
      <div className={`${color.outside} d-flex flex-wrap justify-around rounded-lg shadow-md`}>
        <div className="w-50 min-w-[400px]">
          <div className="m-3">
            <div className="content mb-3">Info User</div>
            <div className="mb-3">
              {report && (
                <div className={`${color.inside} p-2 rounded-lg shadow-md`}>
                  <h2 className="text-2xl font-semibold my-2 mx-3">Sender</h2>
                  <div className="flex justify-content-start my-2 mx-3">
                    <img
                      src={report.author.avatar}
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full mr-3"
                    />
                    <div className="mx-3">
                      <h2 className="text-xl font-semibold">{report.author.account}</h2>
                      <p className="text-gray-600">{report.author.username}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {report && (
                <div className={`${color.inside} p-2 rounded-lg shadow-md`}>
                  <h2 className="text-2xl font-semibold my-2 mx-3">User</h2>
                  <div className="flex justify-content-start my-2 mx-3">
                    <img
                      src={report.author.avatar}
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full mr-3"
                    />
                    <div className="mx-3">
                      <h2 className="text-xl font-semibold">{report.user.account}</h2>
                      <p className="text-gray-600">{report.user.username}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-50 min-w-[400px]">
          <div className="m-3">
            <div className="content mb-3">Info Report</div>
            <div className="items-center">
              {report && (
                <div className={`${color.inside} p-4 rounded-lg shadow-md`}>
                  <div>
                    <h2 className="text-xl font-semibold">Type: {report.type.toUpperCase()}</h2>
                    <p className="text-gray-600">Content: {report.content}</p>
                    <p className="text-gray-600">Date Create: {report.updatedAt}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {report && (
        <div>
          <InfoBlog blog={report.blog} />
          <Blog blog={report.blog} readOnly={true} />
        </div>
      )}
    </div>
  );
};

export default Report;
