import { combineReducers } from "redux";

import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import categoryReducer from "./categoryReducer";
import blogReducer from "./blogReducer";
import policiesReducer from "./policiesReducer";
import userReducer from "./userReducer";
import reportReducer from "./reportReducer";
import themeUserReducer from "./themeUserReducer";
import roomReducer from "./roomReducer";
import commentReducer from "./commentReducer";
import friendReducer from "./friendReducer";
import chatReducer from "./chatReducer";
import memberReducer from "./memberReducer";
import featureReducer from "./featureReducer";
import mainTheme from "./mainTheme";

export default combineReducers({
  authReducer,
  alertReducer,
  loadingReducer,
  categoryReducer,
  blogReducer,
  policiesReducer,
  userReducer,
  reportReducer,
  themeUserReducer,
  roomReducer,
  commentReducer,
  friendReducer,
  chatReducer,
  memberReducer,
  featureReducer,
  mainTheme,
});
