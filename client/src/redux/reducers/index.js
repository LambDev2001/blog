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
import themeReducer from "./themeReducer";
import themeUserReducer from "./themeUserReducer";
import roomReducer from "./roomReducer";
import commentReducer from "./commentReducer";
import friendReducer from "./friendReducer";
import chatReducer from "./chatReducer";
import memberReducer from "./memberReducer";

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
  themeReducer,
  themeUserReducer,
  roomReducer,
  commentReducer,
  friendReducer,
  chatReducer,
  memberReducer,
});
