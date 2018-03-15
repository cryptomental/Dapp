import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import web3Reducer from '../util/web3/web3Reducer';
import deploy from './deploy';
import explorer from './explorer';
import find from './find';
import prefunding from './prefunding';
import testQuery from './testQuery';

export default combineReducers({
  routing: routerReducer,
  web3: web3Reducer,
  find: find,
  deploy: deploy,
  explorer: explorer,
  prefunding: prefunding,
  testQuery: testQuery,
});
