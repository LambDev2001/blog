import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import Header from "../../components/global/Header";
import StatisticalBlog from "../../components/admin/dashboard/StatisticalBlog";
import PieChart from "../../components/admin/dashboard/PieChart";
import LineChart from "../../components/admin/dashboard/LineChart";
import Card from "../../components/global/Card";
import { getDashboard } from "../../redux/actions/dashboardAction";

const Dashboard = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const data = useSelector((state) => state.dashboardReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard(token));
  }, [dispatch, token]);

  return (
    <div className="mx-2">
      <AdminRouteWrapper />
      <Header />

      <StatisticalBlog data={data} />
      <div className="bg-gray-200 rounded-lg shadow-md p-2 my-2 flex flex-wrap justify-around">
        <div className="w-[32%]">
          <PieChart data={data} />
        </div>
        <div className="w-[60%] min-w-[600px]">
          <LineChart data={data} />
        </div>
      </div>

      <div className="bg-gray-200 rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Top Blogs Mosts Views</h2>
        <div className="bg-white rounded-lg shadow-md flex flex-wrap">
          {data.topBlogs &&
            data.topBlogs.map((blog) => {
              return <div key={blog._id}><Card blog={blog}/></div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
