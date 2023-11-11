import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/global/Header";
import TablePermit from "../components/TablePermit";
import Search from "../components/global/Search";
import AdminRouteWrapper from "../utils/AdminRouteWrapper";

import { getPermits } from "../redux/actions/userAction";

const AllUser = () => {
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);
  const token = useSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    const getUsers = async () => {
      const users = await dispatch(getPermits(token));
      setListUsers(users);
    };
    getUsers();
  }, [dispatch, token]);

  const handleAdd = () => {};

  return (
    <div>
      <AdminRouteWrapper />
      <Header content="Manager Permits" />
      {listUsers.length > 0 && (
        <div>
          <Search data={listUsers} type={"user"} add={true} handleAdd={handleAdd} />
          <TablePermit data={listUsers} />
        </div>
      )}
    </div>
  );
};

export default AllUser;
