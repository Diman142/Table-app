/* eslint-disable no-plusplus */
import axios from "axios";
import {
  SET_PAGEDATA,
  SET_FILTERDATA,
  CHANGE_ACTIVE_PAGE,
  SHOW_LOADER,
  HIDE_LOADER,
  CHANGE_TOTAL_COUNT,
  CHANGE_PAGE_ARR,
  CLEAR_PAGE_ARR,
  SET_ALLDATA,
} from "../types";
import { createArrayData } from "../../helpers/helpers";

export function getPageData(arr, pageNumber) {
  let res = [];

  if (arr.length <= 50) {
    return arr;
  }
  const maxItem = pageNumber * 50;
  const minItem = (pageNumber - 1) * 50;
  res = arr.slice(minItem, maxItem);
  return res;
}

export function setPageData(data) {
  return {
    type: SET_PAGEDATA,
    payload: data,
  };
}

function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}

function changeTotalCount(totalcount) {
  return {
    type: CHANGE_TOTAL_COUNT,
    payload: totalcount,
  };
}

export function changePageArr(pageArr) {
  return {
    type: CHANGE_PAGE_ARR,
    payload: pageArr,
  };
}

export function clearPageArr() {
  return {
    type: CLEAR_PAGE_ARR,
  };
}

function setAllData(allData) {
  return {
    type: SET_ALLDATA,
    payload: allData,
  };
}

export function setFilterData(filterData) {
  return {
    type: SET_FILTERDATA,
    payload: filterData,
  };
}

export function changeActivePage(pageNumber, filterData) {
  const pageArr = getPageData(filterData, pageNumber);
  return (dispatch) => {
    dispatch({ type: CHANGE_ACTIVE_PAGE, payload: pageNumber });
    dispatch(setPageData(pageArr));
  };
}

export function getData(activePage = 1) {
  return async (dispatch) => {
    const pageArr = [];
    try {
      dispatch(showLoader());
      const response = await axios(
        `https://gridnine-2e3e2-default-rtdb.firebaseio.com/result.json`
      );

      const stateArr = createArrayData(response.data.flights);

      dispatch(setAllData(stateArr));
      dispatch(setFilterData(stateArr));
      dispatch(changeTotalCount(stateArr.length));

      const currentArr = getPageData(stateArr, activePage);

      dispatch(setPageData(currentArr));

      const maxPageIndex = Math.ceil(stateArr.length / 50);
      for (let i = 1; i <= maxPageIndex; i++) {
        pageArr.push(i);
      }

      dispatch(clearPageArr());
      dispatch(changePageArr(pageArr));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(hideLoader());
    }
  };
}
