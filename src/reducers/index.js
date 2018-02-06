import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import web3Reducer from '../util/web3/web3Reducer';

import deploy from './deploy';
import explorer from './explorer';
import simExchange from './simExchange';
import testQuery from './testQuery';

export default combineReducers({
  route: routerReducer,
  web3: web3Reducer,
  deploy: deploy,
  explorer: explorer,
  simExchange: simExchange,
  testQuery: testQuery,
});
