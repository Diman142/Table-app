import { Pagination } from 'react-bootstrap'

export function textFilter(arr, filterValue) {

  let res = []

  if (arr.length) {
    res = arr.filter((item) => {

      let controlFlag = false

      if (item.airCompany.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) || item.price.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) || item.departure.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) || item.arrival.trim().toLowerCase().includes(filterValue.trim().toLowerCase())) {
        controlFlag = true
      }

      if (controlFlag) {
        return item
      }
    })
  }

  return res
}


export function createArrayData(arr) {

  let res = []

  if (arr.length) {

    let obj = {}

    arr.forEach((item, index) => {
      obj.id = item.flightToken
      obj.airCompany = item.flight.carrier.caption || 'Aэрофлот - российские авиалинии'
      obj.price = item.flight.price.total.amount
      obj.departure = item.flight.legs[0].segments[0].departureAirport.caption
      obj.arrival = item.flight.legs[0].segments[0].arrivalAirport.caption

      res.push(obj)

      obj = {}
    })
  }

  return res
}


export function userSort(arr, sortParam, sortDir) {

  let res = []

  if (sortParam === 'airCompany') {
    if (sortDir) {
      res = arr.sort((a, b) => a.airCompany > b.airCompany ? 1 : -1)
      return res
    } else {
      res = arr.sort((a, b) => a.airCompany > b.airCompany ? -1 : 1)
      return res
    }
  }
  else if (sortParam === 'price') {

    if (sortDir) {
      res = arr.sort((a, b) => +a.price > +b.price ? 1 : -1)
      return res
    } else {
      res = arr.sort((a, b) => +a.price > +b.price ? -1 : 1)
      return res
    }
  }
  else if (sortParam === 'departure') {

    if (sortDir) {
      res = arr.sort((a, b) => a.departure > b.departure ? 1 : -1)
      return res
    } else {
      res = arr.sort((a, b) => a.departure > b.departure ? -1 : 1)
      return res
    }
  }
  else if (sortParam === 'arrival') {
    if (sortDir) {
      res = arr.sort((a, b) => a.arrival > b.arrival ? 1 : -1)
      return res
    } else {
      res = arr.sort((a, b) => a.arrival > b.arrival ? -1 : 1)
      return res
    }
  } else {
    return arr
  }
}


export function getPagination(activePage, pageArr, filterData, changePage) {

  let maxPage = pageArr[pageArr.length - 1]

  if (pageArr.length === 1) {
    return <Pagination.Item active={activePage}>1</Pagination.Item>
  }

  if (pageArr.length === 2) {
    if (activePage === 1) {
      return (
        <>
          <Pagination.Item active={activePage}>1</Pagination.Item>
          <Pagination.Item onClick={() => {
            changePage(2, filterData)
          }}>2</Pagination.Item>
        </>
      )
    } else {
      return (
        <>
          <Pagination.Item onClick={() => {
            changePage(1, filterData)
          }}>1</Pagination.Item>
          <Pagination.Item active={activePage} >2</Pagination.Item>
        </>
      )
    }
  }


  if (pageArr.length === 3) {
    if (activePage === 1) {
      return (
        <>
          <Pagination.Item active={activePage}>1</Pagination.Item>
          <Pagination.Item onClick={() => {
            changePage(2, filterData)
          }}>2</Pagination.Item>
          <Pagination.Item onClick={() => {
            changePage(3, filterData)
          }}>3</Pagination.Item>
        </>
      )
    } else if (activePage === 2) {
      return (
        <>
          <Pagination.Item onClick={() => {
            changePage(1, filterData)
          }}>1</Pagination.Item>
          <Pagination.Item active={activePage} >2</Pagination.Item>
          <Pagination.Item onClick={() => {
            changePage(3, filterData)
          }}>3</Pagination.Item>
        </>
      )
    } else {
      return (
        <>
          <Pagination.Item onClick={() => {
            changePage(1, filterData)
          }}>1</Pagination.Item>
          <Pagination.Item onClick={() => {
            changePage(2, filterData)
          }}>2</Pagination.Item>
          <Pagination.Item active={activePage} >3</Pagination.Item>
        </>
      )
    }
  }

  if (activePage === pageArr[0]) {
    return (
      <>
        <Pagination.Item active={activePage}>{activePage}</Pagination.Item>
        <Pagination.Item onClick={() => {
          changePage(activePage + 1, filterData)

        }}>{activePage + 1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => {
          changePage(maxPage, filterData)

        }}>{maxPage}</Pagination.Item>
        <Pagination.Next onClick={() => {
          changePage(activePage + 1, filterData)

        }} />
        <Pagination.Last onClick={() => {
          changePage(maxPage, filterData)

        }} />
      </>
    )
  } else if (activePage === pageArr[1]) {
    return (
      <>
        <Pagination.First onClick={() => {
          changePage(1, filterData)

        }} />
        <Pagination.Prev onClick={() => {
          changePage(activePage - 1, filterData)

        }} />
        <Pagination.Item onClick={() => {
          changePage(activePage - 1, filterData)

        }}>{activePage - 1}</Pagination.Item>
        <Pagination.Item active={activePage}>{activePage}</Pagination.Item>
        <Pagination.Item onClick={() => {
          changePage(activePage + 1, filterData)

        }}>{activePage + 1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => {
          changePage(maxPage, filterData)

        }}>{maxPage}</Pagination.Item>
        <Pagination.Next onClick={() => {
          changePage(activePage + 1, filterData)

        }} />
        <Pagination.Last onClick={() => {
          changePage(maxPage, filterData)

        }} />
      </>
    )
  }
  else if (activePage === pageArr[pageArr.length - 3]) {
    return (
      <>
        <Pagination.First onClick={() => {
          changePage(1, filterData)
        }} />
        <Pagination.Prev onClick={() => {
          changePage(activePage - 1, filterData)
        }} />
        <Pagination.Item onClick={() => {
          changePage(pageArr[0], filterData)
        }}>{pageArr[0]}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item onClick={() => {
          changePage(activePage - 1, filterData)
        }}>{activePage - 1}</Pagination.Item>
        <Pagination.Item active={activePage}>{activePage}</Pagination.Item>

        <Pagination.Item onClick={() => {
          changePage(activePage + 1, filterData)
        }}>{activePage + 1}</Pagination.Item>

        <Pagination.Item onClick={() => {
          changePage(maxPage, filterData)
        }}>{maxPage}</Pagination.Item>
        <Pagination.Next onClick={() => {
          changePage(activePage + 1, filterData)
        }} />
        <Pagination.Last onClick={() => {
          changePage(maxPage, filterData)
        }} />
      </>
    )
  }

  else if (activePage === pageArr[pageArr.length - 2]) {
    return (
      <>
        <Pagination.First onClick={() => {
          changePage(1, filterData)

        }} />
        <Pagination.Prev onClick={() => {
          changePage(activePage - 1, filterData)

        }} />
        <Pagination.Item onClick={() => {
          changePage(pageArr[0], filterData)

        }}>{pageArr[0]}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => {
          changePage(activePage - 1, filterData)

        }}>{activePage - 1}</Pagination.Item>
        <Pagination.Item active={activePage}>{activePage}</Pagination.Item>
        <Pagination.Item onClick={() => {
          changePage(activePage + 1, filterData)
        }}>{activePage + 1}</Pagination.Item>
        <Pagination.Next onClick={() => {
          changePage(activePage + 1, filterData)
        }} />
        <Pagination.Last onClick={() => {
          changePage(maxPage, filterData)
        }} />
      </>
    )
  }



  else if (activePage === maxPage) {
    return (
      <>
        <Pagination.First onClick={() => {
          changePage(1, filterData)
        }} />
        <Pagination.Prev onClick={() => {
          changePage(activePage - 1, filterData)
        }} />
        <Pagination.Item onClick={() => {
          changePage(pageArr[0], filterData)
        }}>{pageArr[0]}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => {
          changePage(activePage - 1, filterData)
        }}>{activePage - 1}</Pagination.Item>
        <Pagination.Item active={activePage}>{activePage}</Pagination.Item>
      </>
    )
  } else {
    return (
      <>
        <Pagination.First onClick={() => {
          changePage(1, filterData)
        }} />
        <Pagination.Prev onClick={() => {
          changePage(activePage - 1, filterData)
        }} />
        <Pagination.Item onClick={() => {
          changePage(pageArr[0], filterData)
        }}>{pageArr[0]}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item onClick={() => {
          changePage(activePage - 1, filterData)
        }}>{activePage - 1}</Pagination.Item>
        <Pagination.Item active={activePage}>{activePage}</Pagination.Item>

        <Pagination.Item onClick={() => {
          changePage(activePage + 1, filterData)
        }}>{activePage + 1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item onClick={() => {
          changePage(maxPage, filterData)
        }}>{maxPage}</Pagination.Item>
        <Pagination.Next onClick={() => {
          changePage(activePage + 1, filterData)
        }} />
        <Pagination.Last onClick={() => {
          changePage(maxPage, filterData)
        }} />
      </>
    )
  }
}
