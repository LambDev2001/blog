import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { profile } from '../../../redux/actions/global/profileAction'
import { Text } from "../../../components/global/form/Input"
import Friend from '../../../components/user/Friend'
import UserBlogs from '../../../components/user/blogs/UserBlogs'

const Profile = () => {
  const { slug } = useParams()
  const token = useSelector(state => state.authReducer.accessToken)
  const [userInfo, setUserInfo] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!slug) return;
    const getInfoUser = async () => {
      dispatch(profile(slug, token))
        .then((data) => {
          if (!data) {
            history.goBack();
            return;
          }
          setUserInfo(data)
        })
        .catch((err) => console.log(err))
    }
    getInfoUser()
  }, [slug, token, dispatch, history])

  return (
    <div className='d-flex flex-wrap'>
      <div className='flex-1' style={{ minWidth: "400px" }}>
        {
          userInfo.data && (
            <div>
              <div className='d-flex flex-wrap'>
                <div className='flex-1' style={{ minWidth: "250px" }}>
                  {
                    Object.entries(userInfo.data).map(([key, value]) => (
                      key !== "friends" && key !== "_id" && key !== "avatar"
                        ? (<Text key={key} name={key} type="show" value={value} style={{ width: "100%" }} />)
                        : null
                    ))
                  }
                </div>
                <div className='flex-1 d-flex justify-center'>
                  {
                    <img src={userInfo.data.avatar} className='mt-3 mb-3' style={{ minWidth: "100px", maxWidth: "200px" }} alt="" />
                  }
                </div>
              </div>

              <Friend friends={userInfo.data.friends} />
            </div>
          )
        }
      </div>
      <div className='flex-1' style={{ minWidth: "400px" }}>
        <UserBlogs />
      </div>
    </div >
  );
}

export default Profile