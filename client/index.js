import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import rootReducer from '../shared/reducers';
import routes from '../shared/routes';
import thunk from 'redux-thunk';
import immutifyState from '../shared/libs/immutifyState';
import { createStore,
         applyMiddleware } from 'redux';

import '../assets/styles/style.scss';

const initialState = immutifyState(window.__INITIAL_STATE__);

const history = createBrowserHistory();

const store = applyMiddleware(thunk)(createStore)(rootReducer, initialState);

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('root')
);
