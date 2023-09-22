import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import { getReports } from "../../redux/actions/reportAction";
import TableReport from "../../components/admin/TableReport";
import Header from "../../components/global/Header";

const Reports = () => {
  const reports = useSelector((state) => state.reportReducer.reports);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReports(token));
  }, [dispatch, token]);

  return (
    <div className="mx-2">
      <AdminRouteWrapper />
      <Header />
      <div>{reports && <TableReport data={reports} />}</div>
    </div>
  );
};

export default Reports;
