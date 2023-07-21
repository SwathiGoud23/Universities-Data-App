import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import institutionsReducer from './ducks/institutionsReducer';

// Create the Redux store
const store = configureStore({
  reducer: institutionsReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;