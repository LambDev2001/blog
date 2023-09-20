import React, { useEffect } from "react";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import Header from "../../components/global/Header";
import StatisticalBlog from "../../components/admin/dashboard/StatisticalBlog";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../redux/actions/dashboardAction";

const Dashboard = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const data = useSelector((state=> state.dashboardReducer))
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getDashboard(token))
  }, [dispatch, token])
  
  return (
    <div className="mx-2">
      <AdminRouteWrapper />
      <Header />

      <StatisticalBlog data={data} />
    </div>
  );
};

export default Dashboard;
