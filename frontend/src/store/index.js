import { createStore, applyMiddleware, compose } from 'redux';
// import reducer from '../reducer/index';
import thunk from 'redux-thunk';
import { geoSpatialSlice } from './geojsonSlice';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  geoSpatialSlice.reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
