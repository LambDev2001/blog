import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/global/Header";
import TablePermit from "../components/TablePermit";
import Search from "../components/global/Search";
import AdminRouteWrapper from "../utils/AdminRouteWrapper";

import ModalAddPermit from "../components/modal/ModalAddPermit";
import { deletePermit, getPermits } from "../redux/actions/userAction";

const AllUser = () => {
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const token = useSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    const getUsers = async () => {
      const users = await dispatch(getPermits(token));
      setListUsers(users);
    };
    getUsers();
  }, [dispatch, token]);

  const handleAddModal = () => {
    setIsModalAdd(!isModalAdd);
  };

  const handleAddNewPermit = (newPermit) => {
    setListUsers([...listUsers, newPermit]);
  };

  const handleDeletePermit = async (id) => {
    const idPermit = await dispatch(deletePermit(id, token));
    if (!!idPermit) {
      const newListUsers = listUsers.filter((user) => user._id !== id);
      setListUsers(newListUsers);
    }
  };

  return (
    <div>
      <AdminRouteWrapper />
      <Header content="Manager Permits" />
      {listUsers.length > 0 && (
        <div>
          <Search data={listUsers} type={"user"} add={true} handleAdd={handleAddModal} />
          <TablePermit
            data={listUsers}
            handleAddModal={handleAddModal}
            isModalAdd={isModalAdd}
            handleDeletePermit={handleDeletePermit}
          />
        </div>
      )}

      {isModalAdd && (
        <ModalAddPermit
          token={token}
          handleAddModal={handleAddModal}
          handleAddNewPermit={handleAddNewPermit}
          handleDeletePermit={handleDeletePermit}
        />
      )}
    </div>
  );
};

export default AllUser;
