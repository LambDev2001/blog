import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/global/Header";
import StatisticalBlog from "../components/dashboard/StatisticalBlog";
import PieChart from "../components/dashboard/PieChart";
import LineChart from "../components/dashboard/LineChart";
import Card from "../components/global/Card";
import { getDashboard } from "../redux/actions/dashboardAction";
import AdminRouteWrapper from "../utils/AdminRouteWrapper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Dashboard = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const data = useSelector((state) => state.dashboardReducer);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!!user && user.role === "permit") {
      history.push("/index-permit");
    }
  }, [user, history]);

  useEffect(() => {
    dispatch(getDashboard(token));
  }, [dispatch, token]);

  return (
    <div>
      <AdminRouteWrapper />
      <Header content="Dashboard" />

      <StatisticalBlog data={data} />
      <div
        className={`${color.outside} rounded-lg shadow-md p-2 my-2 flex flex-wrap justify-around`}>
        <div className="w-[32%]">
          <PieChart data={data} />
        </div>
        <div className="w-[60%] min-w-[600px]">
          <LineChart data={data} />
        </div>
      </div>

      <div className={`${color.outside} rounded-lg shadow-md p-4`}>
        <h2 className="text-2xl font-semibold mb-4">Top Blogs Mosts Views</h2>
        <div className={` rounded-lg shadow-md flex flex-wrap`}>
          {data.topBlogs && data.topBlogs.map((blog) => <Card blog={blog} key={blog._id} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
