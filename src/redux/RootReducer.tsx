import { combineReducers } from "redux";
import app from "./AppReducer";

const rootReducer = combineReducers({
  app: app.reducer,
});
export default rootReducer;
