import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import AdminRouteWrapper from '../../../utils/AdminRouteWrapper'
import { profileAdmin } from '../../../redux/actions/profileAction'
import Header from '../../../components/global/Header'

const Profile = () => {
  const { slug } = useParams()
  const token = useSelector(state => state.authReducer.accessToken)
  const [userInfo, setUserInfo] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if (!slug) return;
    const getInfoUser = async () => {
      const user = await dispatch(profileAdmin(slug, token))

      setUserInfo(user.data)
    }
    getInfoUser()
  }, [slug, token, dispatch])
  console.log(userInfo);
  

  return (
    <div className='mx-2'>
      <AdminRouteWrapper />
      <Header />
      

    </div >
  );
}

export default Profile