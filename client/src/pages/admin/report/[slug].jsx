import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComments, faShare, faEye } from "@fortawesome/free-solid-svg-icons";

import Header from "../../../components/global/Header";
import Blog from "../../../components/global/Blog";
import AdminRouteWrapper from "../../../utils/AdminRouteWrapper";
import { acceptReport, declineReport, getReport } from "../../../redux/actions/reportAction";

const Report = () => {
  const [report, setReport] = useState({});
  const [openAction, setOpenAction] = useState(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);
  const history = useHistory();

  useEffect(() => {
    const fetchReportData = async () => {
      const fetchedReportData = await dispatch(getReport(slug, token));
      if (fetchedReportData) setReport(fetchedReportData);
    };

    fetchReportData();
  }, [dispatch, slug, token]);

  const handleViolate = () => {
    dispatch(acceptReport(report._id, token));
    history.push(`/admin/user/${report.reportedIdUser}`);
  };

  const handleNotViolate = () => {
    dispatch(declineReport(report._id, token));
    history.push(`/admin/user/${report.reportedIdUser}`);
  };

  return (
    <div>
      <AdminRouteWrapper />
      <Header />

      {/* action btn */}
      <div className="sticky top-[110px] z-[900] flex justify-end items-center space-x-2 cursor-pointer h-0">
        {openAction && (
          <div className="bg-white p-2 rounded-lg shadow-md border-element">
            <button
              className="bg-green-500 text-white p-2 rounded-md mr-2"
              onClick={()=>handleNotViolate()}>
              Not violate
            </button>
            <button className="bg-red-500 text-white p-2 rounded-md" onClick={()=>handleViolate()}>
              Violate
            </button>
          </div>
        )}
        <div
          className="rounded-full bg-cyan-400 p-3 m-2 h-[60px] w-[60px] text-center flex justify-center items-center"
          onClick={() => setOpenAction(!openAction)}>
          <span className="text-white font-semibold">Action</span>
        </div>
      </div>

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
              {/* basic info */}
              <div className="m-2">
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

              {/* social */}
              <div className="flex justify-around m-2 mt-3">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faThumbsUp} className="h-[22px]" />
                  <span className="ml-1">{report.blog.likes}</span>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faThumbsUp} rotation={180} className="h-[22px]" />
                  <span className="ml-1">{report.blog.dislikes}</span>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faComments} className="h-[22px]" />
                  <span className="ml-1">{report.blog.comments}</span>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faEye} className="h-[22px]" />
                  <span className="ml-1">{report.blog.views}</span>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faShare} className="h-[22px]" />
                  <span className="ml-1">{report.blog.share}</span>
                </div>
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

          <div className="m-3">
            <Blog blog={report.blog} readOnly={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
