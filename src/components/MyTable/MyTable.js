import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { getData } from '../../redux/actions/actions'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import { changeActivePage, setFilterData, setPageData, getPageData } from '../../redux/actions/actions'
import Loader from "react-loader-spinner";
import { getPagination, userSort } from '../../helpers/helpers'

const MyTable = ({ pageArr, activePage, pageData, isLoaded, getData, changePage, filterData, changeFilterData, changePageData }) => {

  const [sortDir, setSortDir] = useState(false)
  const [dataFlag, setDataFlag] = useState(true)

  const sortHandler = (sortParam) => {

    let sortArr = userSort(filterData, sortParam, sortDir)
    changeFilterData(sortArr)
    changePageData(getPageData(sortArr, activePage))
    changePage(activePage, sortArr)
    setSortDir(prev => !prev)
  }

  useEffect(() => {
    getData(1)
  }, [])

  useEffect(() => {
    if (pageData.length) {
      setDataFlag(true)
    } else {
      setDataFlag(false)
    }
  }, [pageData])

  return (
    <>
      {isLoaded ?
        <>
          <h2 className="text-center mb-3"> This is table with some flights info</h2>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Number</th>
                <th id="airCompany" className="pointer" onClick={(event) => {
                  sortHandler(event.target.id)
                }}>Aircompany</th>
                <th id="price" className="pointer" onClick={(event) => {
                  sortHandler(event.target.id)
                }}>Price</th>
                <th id="departure" className="pointer" onClick={(event) => {
                  sortHandler(event.target.id)
                }}>Departure Airport</th>
                <th id="arrival" className="pointer" onClick={(event) => {
                  sortHandler(event.target.id)
                }}>Arrival Airport</th>
              </tr>
            </thead>
            <tbody >
              {dataFlag ? pageData.map((item, index) => {
                return (
                  <tr key={item.id + index}>
                    <td>{1 + index + 50 * (activePage - 1)}</td>
                    <td>{item.airCompany}</td>
                    <td>{item.price}</td>
                    <td>{item.departure}</td>
                    <td>{item.arrival}</td>
                  </tr>
                )
              }) :
                <tr>
                  <td>Данных не найдено</td>
                </tr>}
            </tbody>
          </Table>

          <Pagination>
            {dataFlag ? getPagination(activePage, pageArr, filterData, changePage) : null}
          </Pagination>
        </> :
        <Loader
          type="Circles"
          color="#8e24aa"
          height={100}
          width={100}
          className="text-center"
        />
      }


    </>
  )
}


const mapStateToProps = (state) => ({
  pageArr: state.pageInfo.pageArr,
  activePage: state.pageInfo.activePage,
  pageData: state.setData.pageData,
  isLoaded: state.changeLoader.isLoaded,
  filterData: state.setData.filterData
})


const mapDispatchToProps = dispatch => {
  return {
    changePage: (pageNumber, filterData) => dispatch(changeActivePage(pageNumber, filterData)),
    getData: (activePage) => dispatch(getData(activePage)),
    changeFilterData: (newData) => dispatch(setFilterData(newData)),
    changePageData: (newData) => dispatch(setPageData(newData))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyTable)


