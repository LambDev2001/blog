import { combineReducers } from "redux";

import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import categoryReducer from "./categoryReducer";
import blogReducer from "./blogReducer";
import policiesReducer from "./policiesReducer";
import menuReducer from "./menuReducer";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
import reportReducer from "./reportReducer";

export default combineReducers({
  authReducer,
  alertReducer,
  loadingReducer,
  categoryReducer,
  blogReducer,
  policiesReducer,
  menuReducer,
  userReducer,
  dashboardReducer,
  reportReducer,
});
