import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/global/Header";
import TableInfo from "../components/TableInfo";
import Search from "../components/global/Search";

import { allUsers } from "../redux/actions/userAction";

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
    <div>
      <Header content="Manager Users" />
      {listUsers.length > 0 && (
        <div>
          <Search data={listUsers} type={"user"} />
          <TableInfo data={listUsers} />
        </div>
      )}
    </div>
  );
};

export default AllUser;
