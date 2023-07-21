import {
    fetchInstitutionsRequest,
    fetchInstitutionsSuccess,
    fetchInstitutionsFailure,
    fetchInstitutions,
  } from './institutionsActions';
  import configureMockStore from 'redux-mock-store';
  import thunk from 'redux-thunk';
  import axios from 'axios';
  import MockAdapter from 'axios-mock-adapter';
  
  const mockStore = configureMockStore([thunk]);
  const mock = new MockAdapter(axios);
  
  describe('institutionsActions', () => {
    afterEach(() => {
      mock.reset();
    });
  
    it('should create an action to fetch institutions request', () => {
      const expectedAction = { type: 'FETCH_INSTITUTIONS_REQUEST' };
      expect(fetchInstitutionsRequest()).toEqual(expectedAction);
    });
  
    it('should create an action to fetch institutions success', () => {
      const institutions = [{ id: 1, name: 'University' }];
      const expectedAction = {
        type: 'FETCH_INSTITUTIONS_SUCCESS',
        payload: institutions,
      };
      expect(fetchInstitutionsSuccess(institutions)).toEqual(expectedAction);
    });
  
    it('should create an action to fetch institutions failure', () => {
      const error = 'Failed to fetch institutions';
      const expectedAction = {
        type: 'FETCH_INSTITUTIONS_FAILURE',
        payload: error,
      };
      expect(fetchInstitutionsFailure(error)).toEqual(expectedAction);
    });
  
    it('should create FETCH_INSTITUTIONS_SUCCESS action when fetching institutions is successful', () => {
      const institutions = [{ id: 1, name: 'University' }];
      mock.onGet('http://localhost:3000/institutions').reply(200, institutions);
  
      const expectedActions = [
        { type: 'FETCH_INSTITUTIONS_REQUEST' },
        { type: 'FETCH_INSTITUTIONS_SUCCESS', payload: institutions },
      ];
  
      const store = mockStore({ institutions: [], loading: false, error: '' });
  
      return store.dispatch(fetchInstitutions()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  
    it('should create FETCH_INSTITUTIONS_FAILURE action when fetching institutions fails', () => {
      const error = 'Failed to fetch institutions';
      mock.onGet('http://localhost:3000/institutions').reply(500, error);
  
      const expectedActions = [
        { type: 'FETCH_INSTITUTIONS_REQUEST' },
        { type: 'FETCH_INSTITUTIONS_FAILURE', payload: error },
      ];
  
      const store = mockStore({ institutions: [], loading: false, error: '' });
  
      return store.dispatch(fetchInstitutions()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
  