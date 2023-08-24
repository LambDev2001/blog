import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { profile } from '../../redux/actions/userAction'
import { Text } from "../../components/form/Input"
import Friend from '../../components/Friend'
import UserBlogs from '../../components/blogs/UserBlogs'

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
          if (!data) history.push("/login")
          setUserInfo(data)
        })
        .catch((err) => console.log(err))
    }
    getInfoUser()
  }, [slug, token, dispatch, history])

  return (
    <div className='d-flex'>
      <div>
        {
          userInfo.data && (
            <div>
              {
                Object.entries(userInfo.data).map(([key, value]) => (
                  key !== "friends" && key !== "_id"
                    ? (<Text key={key} name={key} type="show" value={value} />)
                    : null
                ))
              }
              <Friend friends={userInfo.data.friends} />
            </div>
          )
        }
      </div>
      <div>
        <UserBlogs />
      </div>
    </div >
  );
}

export default Profile