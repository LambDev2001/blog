import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginAdmin } from "../../../redux/actions/authAction";
import { Text } from "../form/Input";
import Password from "../../global/form/Password";
import Button from "../../global/theme/button/Button";

const LoginPass = () => {
  const [infoUser, setInfoUser] = useState({
    account: "",
    password: "",
  });
  const color = useSelector((state) => state.themeReducer.themeColor);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoUser({ ...infoUser, [name]: value }); // update new name: account or password = value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(infoUser).forEach((key) => {
      if (infoUser[key] === "") {
        delete infoUser[key];
      }
    });

    dispatch(loginAdmin(infoUser));
    history.goBack();
  };

  return (
    <form
      className={`${color.outside} rounded-lg shadow-lg p-2 max-w-lg mx-auto`}
      onSubmit={handleSubmit}>
      <div className={`${color.inside} p-4 rounded-lg shadow-md`}>
        <div className="text-2xl font-semibold mb-4 text-center">Login Form</div>
        <Text name="account" handleText={handleChangeInput} />
        <Password name="password" handlePassword={handleChangeInput} />

        <div className="flex justify-end">
          <Button text={"Login"} color={2} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default LoginPass;
