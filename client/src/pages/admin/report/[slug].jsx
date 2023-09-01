import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import AdminRouteWrapper from '../../../utils/AdminRouteWrapper'
import { getReport } from '../../../redux/actions/reportAction'

const Report = () => {
  const [report, setReport] = useState({})
  const { slug } = useParams()
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.accessToken)

  useEffect(() => {
    const fetchReportData = async () => {
      const fetchedReportData = await dispatch(getReport(slug, token));
      if (fetchedReportData) setReport(fetchedReportData);
    };

    fetchReportData();
  }, [dispatch, slug, token]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <AdminRouteWrapper />
      <div className='d-flex'>
        <div className='w-50 p-2'>
          <div className='content my-3'>Info Sender</div>
          <div className="items-center">
            {report.author && (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="mb-4">
                  <img src={report.author.avatar} alt="User Avatar" className="w-16 h-16 rounded-full mx-auto" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{report.author.account}</h2>
                  <p className="text-gray-600">{report.author.username}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='w-50 p-2'>
          <div className='content my-3'>Info Report</div>
          <div className="items-center">
            {report.author && (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div>
                  <h2 className="text-xl font-semibold">Type: {(report.type).toUpperCase()}</h2>
                  <p className="text-gray-600">Content: {report.content}</p>
                  <p className="text-gray-600">Date Create: {report.updatedAt}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {
        report.user &&
        <div>
          <div className='content my-3'>Info User</div>
          <div className='bg-white rounded shadow-lg d-flex'>
            <img className='rounded-circle p-2' src={report.user.avatar} alt="" />
            <div>
              <h2 className="text-xl font-semibold">Account: {report.author.account}</h2>
              <p className="text-gray-600">Username: {report.author.username}</p>
              <p className="text-gray-600">Date Create: {report.updatedAt}</p>
            </div>
          </div>
        </div>

      }
    </div>
  );
}

export default Report