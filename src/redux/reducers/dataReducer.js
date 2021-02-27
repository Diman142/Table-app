import { SET_PAGEDATA, SET_FILTERDATA, SET_ALLDATA } from "../types";

const initialState = {
  pageData: [],
  filterData: [],
  allData: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGEDATA:
      return { ...state, pageData: action.payload };
    case SET_FILTERDATA:
      return { ...state, filterData: action.payload };
    case SET_ALLDATA:
      return { ...state, allData: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
