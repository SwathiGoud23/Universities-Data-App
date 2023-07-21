import axios from 'axios';


// Action Types
export const FETCH_INSTITUTIONS_REQUEST = 'FETCH_INSTITUTIONS_REQUEST';
export const FETCH_INSTITUTIONS_SUCCESS = 'FETCH_INSTITUTIONS_SUCCESS';
export const FETCH_INSTITUTIONS_FAILURE = 'FETCH_INSTITUTIONS_FAILURE';

// Action Creators
export const fetchInstitutionsRequest = () => {
  return {
    type: FETCH_INSTITUTIONS_REQUEST
  };
};

export const fetchInstitutionsSuccess = (institutions) => {
  return {
    type: FETCH_INSTITUTIONS_SUCCESS,
    payload: institutions
  };
};

export const fetchInstitutionsFailure = (error) => {
  return {
    type: FETCH_INSTITUTIONS_FAILURE,
    payload: error
  };
};

// Async Action Creator
export const fetchInstitutions = () => {
  return (dispatch) => {
    dispatch(fetchInstitutionsRequest());

    axios.get('http://localhost:3000/institutions')
      .then(response => {
        dispatch(fetchInstitutionsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchInstitutionsFailure(error.message));
      });
  };
};