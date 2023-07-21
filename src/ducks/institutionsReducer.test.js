import institutionsReducer from './institutionsReducer';
import {
  FETCH_INSTITUTIONS_REQUEST,
  FETCH_INSTITUTIONS_SUCCESS,
  FETCH_INSTITUTIONS_FAILURE,
} from '../actions/institutionsActions';

describe('institutionsReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      institutions: [],
      loading: false,
      error: null,
    };
    expect(institutionsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_INSTITUTIONS_REQUEST', () => {
    const initialState = {
      institutions: [],
      loading: false,
      error: null,
    };
    const expectedState = {
      institutions: [],
      loading: true,
      error: null,
    };
    expect(
      institutionsReducer(initialState, {
        type: FETCH_INSTITUTIONS_REQUEST,
      })
    ).toEqual(expectedState);
  });

  it('should handle FETCH_INSTITUTIONS_SUCCESS', () => {
    const initialState = {
      institutions: [],
      loading: true,
      error: null,
    };
    const mockInstitutions = [{ id: 1, name: 'University' }];
    const expectedState = {
      institutions: mockInstitutions,
      loading: false,
      error: null,
    };
    expect(
      institutionsReducer(initialState, {
        type: FETCH_INSTITUTIONS_SUCCESS,
        payload: mockInstitutions,
      })
    ).toEqual(expectedState);
  });

  it('should handle FETCH_INSTITUTIONS_FAILURE', () => {
    const initialState = {
      institutions: [],
      loading: true,
      error: null,
    };
    const error = 'Failed to fetch institutions';
    const expectedState = {
      institutions: [],
      loading: false,
      error: error,
    };
    expect(
      institutionsReducer(initialState, {
        type: FETCH_INSTITUTIONS_FAILURE,
        payload: error,
      })
    ).toEqual(expectedState);
  });
});
