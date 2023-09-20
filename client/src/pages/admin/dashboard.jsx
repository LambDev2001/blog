import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import Header from "../../components/global/Header";
import StatisticalBlog from "../../components/admin/dashboard/StatisticalBlog";
import Chart from "../../components/admin/dashboard/Chart";
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
      <div className="w-100 bg-gray-200 rounded-lg shadow-md p-2 my-2">
        <Chart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
