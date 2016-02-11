import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import routes from '../shared/routes';
// import promiseMiddleware from '../shared/libs/promiseMiddleware';
import thunk from 'redux-thunk';
import immutifyState from '../shared/libs/immutifyState';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';

import '../assets/styles/style.scss';

const initialState = immutifyState(window.__INITIAL_STATE__);

const history = createBrowserHistory();

const reducer = combineReducers(reducers);
const store = applyMiddleware(thunk)(createStore)(reducer, initialState);

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('root')
);
