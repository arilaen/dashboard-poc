import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from './shared/routes';
import { Provider } from 'react-redux';
import rootReducer from './shared/reducers';
import thunk from 'redux-thunk';
import fetchComponentData from './shared/libs/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';
import path from 'path';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack/dev.config').default(app);
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use( (req, res) => {

  const location = createLocation(req.url);
  const store = createStore(rootReducer, applyMiddleware(thunk));

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Dashboard POC</title>
          <link rel="stylesheet" type="text/css" href="/style.css">
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="root">${componentHTML}</div>
          <script type="application/javascript" src="/client.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

export default app;
