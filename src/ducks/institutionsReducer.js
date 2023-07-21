import {
    FETCH_INSTITUTIONS_REQUEST,
    FETCH_INSTITUTIONS_SUCCESS,
    FETCH_INSTITUTIONS_FAILURE
  } from '../actions/institutionsActions';
  
  // Initial state
  const initialState = {
    institutions: [],
    loading: false,
    error: null
  };
  
  // Institutions reducer
  const institutionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_INSTITUTIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_INSTITUTIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          institutions: action.payload
        };
      case FETCH_INSTITUTIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default institutionsReducer;