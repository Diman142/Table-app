import { SHOW_LOADER, HIDE_LOADER } from '../types'

const initialState = {
  isLoaded: true
}


const loaderReducer = (state = initialState, action) => {

  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, isLoaded: false }
    case HIDE_LOADER:
      return { ...state, isLoaded: true }
    default: return state
  }
}

export default loaderReducer
