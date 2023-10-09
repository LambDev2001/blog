import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableReport from "../components/TableReport";
import Header from "../components/global/Header";

import { getReports } from "../redux/actions/reportAction";

const Reports = () => {
  const reports = useSelector((state) => state.reportReducer.reports);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReports(token));
  }, [dispatch, token]);

  return (
    <div>
      <Header content="Manager Reports" />
      <div>{reports && <TableReport data={reports} />}</div>
    </div>
  );
};

export default Reports;
