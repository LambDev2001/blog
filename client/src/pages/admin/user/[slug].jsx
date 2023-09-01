import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminRouteWrapper from '../../../utils/AdminRouteWrapper'
import { getUser } from '../../../redux/actions/userAction'
import { Text } from "../../../components/global/form/Input"
import Friend from '../../../components/global/Friend'
import Card from '../../../components/global/Card'
import TableReport from '../../../components/admin/TableReport'

const User = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const token = useSelector(state => state.authReducer.accessToken)


  useEffect(() => {
    const getInfoUser = async () => {
      const infoUser = await dispatch(getUser(slug, token))
      if (infoUser) setUser(infoUser)
    }
    getInfoUser()
  }, [slug, dispatch, token])


  return (
    <div className='w-100'>
      <AdminRouteWrapper />
      <div className='content pl-2'>Information User</div>
      <div className=' d-flex flex-wrap'>
        <div className='flex-1 pl-2 pr-2' style={{ minWidth: "350px" }}>
          { user &&
            Object.entries(user).map(([key, value]) => (
              <div key={key}>
                {key !== "avatar" && key !== "friends" && key !== "report" && key !== "reports" && key !== "blogs" &&
                  <Text name={key} type="show" value={value} />
                }
              </div>
            ))
          }
        </div>

        <div className='flex-1 pl-2 pr-2' style={{ minWidth: "350px" }}>
          <img className='rounded-circle' src={user.avatar} alt="" style={{ margin: "auto", marginTop: "2rem" }} />
          <Friend friends={user.friends} />
        </div>
      </div>

      {
        user.blogs && user.blogs.length > 0 &&
        <div>
          <hr className='my-3' />
          <div className='content pl-2'>Blogs ({user.blogs.length})</div>
          <div className='d-flex flex-wrap justify-around mx-4'>
            {
              user.blogs.map((blog) =>
                (<Card blog={blog} key={blog._id} />)
              )
            }
          </div>
        </div>
      }

      {
        user.report && user.report.length > 0 &&
        <div>
          <hr className='my-3' />
          <div className='content pl-2'>Reports ({user.reports.length})</div>
          <TableReport data={user.reports} />
        </div>
      }

    </div>
  )
}

export default User