import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";

import Header from "../../components/global/Header";
import InfoBlog from "../../components/global/InfoBlog";
import Blog from "../../components/global/Blog";
import Button from "../../components/global/theme/button/Button";
import Comment from "../../components/comment/Comment";

import { acceptReport, declineReport, getReport } from "../../redux/actions/reportAction";
import AdminRouteWrapper from "../../utils/AdminRouteWrapper";

const Report = () => {
  const [openAction, setOpenAction] = useState(false);
  const report = useSelector((state) => state.reportReducer.report);
  const comments = useSelector((state) => state.commentReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const history = useHistory();
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReport(slug, token));
  }, [dispatch, slug, token]);

  const handleViolate = async () => {
    await dispatch(acceptReport(report._id, report.author._id, token));
    history.goBack();
  };

  const handleNotViolate = async () => {
    await dispatch(declineReport(report._id, token));
    history.goBack();
  };

  return (
    <div>
      <AdminRouteWrapper />
      <Header content="Manager Report" />

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

      {report && report.type === "blog" && (
        <div>
          <InfoBlog blog={report.blog} />
          <Blog blog={report.blog} readOnly={true} />
        </div>
      )}

      {report && report.type === "comment" && (
        <div>
          <div
            className={`${color.outside} rounded-lg flex justify-center my-2 py-2 cursor-pointer`}
            onClick={() => history.push(`/blog/${report.comment.idBlog}`)}>
            <div>
              {/* comment parent */}
              <div className="my-2 flex">
                {/* Avatar */}
                <img
                  src={report.author.avatar}
                  alt="avatar"
                  className="rounded-circle h-[32px] w-[32px] my-2"
                />

                {/* Info report */}
                <div>
                  {/* info */}
                  <div className="ml-2 relative">
                    <div className={`${color.inside} p-2 rounded-lg max-w-prose`}>
                      <div className="font-bold">{report.author.username}</div>
                      <div className="block">{report.comment.message}</div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <div>
                        {formatDistanceToNow(new Date(report.comment.createdAt), {
                          addSuffix: true,
                          includeSeconds: true,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {report.comments.length > 0 && report && (
            <Comment
              idBlog={report.comment.idBlog}
              comments={report.comments}
              idReport={report.comment._id}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
