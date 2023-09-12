import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../../components/global/Header";
import AdminRouteWrapper from "../../../utils/AdminRouteWrapper";
import { getReport } from "../../../redux/actions/reportAction";

const Report = () => {
  const [report, setReport] = useState({});
  const { slug } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    const fetchReportData = async () => {
      const fetchedReportData = await dispatch(getReport(slug, token));
      if (fetchedReportData) setReport(fetchedReportData);
    };

    fetchReportData();
  }, [dispatch, slug, token]);

  console.log(report.blog);

  return (
    <div>
      <AdminRouteWrapper />
      <Header />
      <div className="d-flex flex-wrap justify-around shadow-element border-element radius-element m-2">
        <div className="w-50 min-w-[400px]">
          <div className="m-3">
            <div className="content mb-3">Info User</div>
            <div className="mb-3">
              {report.author && (
                <div className="bg-white p-2 rounded-lg shadow-lg">
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
              {report.user && (
                <div className="bg-white p-2 rounded-lg shadow-lg">
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
              {report.author && (
                <div className="bg-white p-4 rounded-lg shadow-lg">
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

      {report.blog && (
        <div className="shadow-element border-element radius-element m-2">
          <div className="content m-3 mb-2">Info Blog</div>
          <div className="d-flex flex-wrap">
            <div className="bg-white p-2 rounded-lg shadow-lg m-3 flex-1">
              <div className="flex justify-content-start align-items-end m-2">
                <h2 className="text-xl font-semibold mr-3">Title:</h2>
                <p className="text-gray-600">{report.blog.title}</p>
              </div>

              <div className="flex justify-content-start align-items-end m-2">
                <h2 className="text-xl font-semibold mr-3">Category:</h2>
                <p className="text-gray-600">{report.blog.category}</p>
              </div>

              <div className="m-2">
                <h2 className="text-xl font-semibold mr-3">Description:</h2>
                <p className="text-gray-600">{report.blog.description}</p>
              </div>

              <div className="flex justify-content-start align-items-end m-2">
                <h2 className="text-xl font-semibold mr-3">Status:</h2>
                <p className="text-gray-600">{report.blog.status}</p>
              </div>
            </div>

            <div className="bg-white p-2 rounded-lg shadow-lg m-3 flex-1">
              <h2 className="text-2xl font-semibold my-2 mx-3">Thumbnail</h2>
              <div className="flex justify-content-center my-2 mx-3">
                <img
                  src={report.blog.thumbnail}
                  alt="User Avatar"
                  className="max-w-[400px] max-h-[200px]"
                />
               
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
