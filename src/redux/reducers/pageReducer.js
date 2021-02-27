import { CHANGE_ACTIVE_PAGE, CHANGE_TOTAL_COUNT, CHANGE_PAGE_ARR, CLEAR_PAGE_ARR } from '../types'

const initialState = {
  pageArr: [],
  activePage: 1,
  totalCount: 0
}

const pageReducer = (state = initialState, action) => {

  switch (action.type) {
    case CHANGE_ACTIVE_PAGE:
      return { ...state, activePage: action.payload }

    case CHANGE_TOTAL_COUNT:
      return { ...state, totalCount: action.payload }

    case CHANGE_PAGE_ARR:
      return { ...state, pageArr: state.pageArr.concat([...action.payload]) }

    case CLEAR_PAGE_ARR:
      return { ...state, pageArr: [] }
    default: return state
  }
}


export default pageReducer
