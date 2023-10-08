import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Profile from "../../components/basic/Profile";

import { getInfoUser } from "../../redux/actions/userAction";

const ProfilePage = () => {
  const { slug } = useParams();
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoUser(slug, token));
  }, [dispatch, token, slug]);

  return <Profile />;
};

export default ProfilePage;
