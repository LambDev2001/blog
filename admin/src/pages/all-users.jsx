import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/global/Header";
import { allUsers } from "../redux/actions/userAction";
import TableInfo from "../components/TableInfo";
import AdminRouteWrapper from "../utils/AdminRouteWrapper";
import Search from "../components/global/Search";
import Menu from "../components/Menu";

const AllUser = () => {
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);
  const token = useSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    const getUsers = async () => {
      const users = await dispatch(allUsers(token));
      setListUsers(users);
    };
    getUsers();
  }, [dispatch, token]);

  return (
    <div className="d-flex">
      <Menu />
      <div className="w-100">
        <div className="mx-2">
          <AdminRouteWrapper />
          <Header content="Manager Users" />
          {listUsers.length > 0 && (
            <div>
              <Search data={listUsers} type={"user"} />
              <TableInfo data={listUsers} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUser;
