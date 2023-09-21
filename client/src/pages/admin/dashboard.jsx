import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import Header from "../../components/global/Header";
import StatisticalBlog from "../../components/admin/dashboard/StatisticalBlog";
import PieChart from "../../components/admin/dashboard/PieChart";
import { getDashboard } from "../../redux/actions/dashboardAction";
import LineChart from "../../components/admin/dashboard/LineChart";

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
        <div className="w-[35%]">
          <PieChart data={data} />
        </div>
        <div className="w-[60%] min-w-[600px]">
          <LineChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
