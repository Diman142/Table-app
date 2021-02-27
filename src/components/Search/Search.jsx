/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { textFilter } from "../../helpers/helpers";
import {
  setFilterData,
  getPageData,
  setPageData,
  clearPageArr,
  changePageArr,
} from "../../redux/actions/actions";

const Search = ({ allData, changeFilterData, changePageData }) => {
  const [serachValue, setSearchValue] = useState("");

  return (
    <Form
      className="mb-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Search data</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter search data"
          value={serachValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
            const newData = textFilter(allData, event.target.value);
            changeFilterData(newData);
            changePageData(getPageData(newData, 1));
          }}
        />
        <Form.Text className="text-muted">
          We will never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  allData: state.setData.allData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeFilterData: (data) => {
      const pageArr = [];

      const maxPageIndex = Math.ceil(data.length / 50);
      for (let i = 1; i <= maxPageIndex; i++) {
        pageArr.push(i);
      }

      dispatch(clearPageArr());
      dispatch(changePageArr(pageArr));
      dispatch(setFilterData(data));
    },
    changePageData: (data) => {
      dispatch(setPageData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
