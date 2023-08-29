import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminRouteWrapper from "../../utils/AdminRouteWrapper";
import { getReports } from '../../redux/actions/admin/reportAction';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const token = useSelector(state => state.authReducer.accessToken)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchReportData = async () => {
      const fetchedReportData = await dispatch(getReports(token))
      if (fetchedReportData) setReports(fetchedReportData)
    }

    fetchReportData()
  }, [dispatch, token, reports])

  return (
    <div>
      <AdminRouteWrapper />
        reports
|    </div>
  );
};

export default Reports;
