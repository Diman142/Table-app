import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import pageReducer from "./pageReducer";
import loaderReducer from "./loaderReducer";

const rootReducer = combineReducers({
  setData: dataReducer,
  pageInfo: pageReducer,
  changeLoader: loaderReducer,
});

export default rootReducer;
