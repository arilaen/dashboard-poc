import koa                       from 'koa';
import koaStatic                 from 'koa-static';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from './src/routes';
import { Provider }              from 'react-redux';
import * as reducers             from './src/reducers';
import promiseMiddleware         from './src/libs/promiseMiddleware';
import fetchComponentData        from './src/libs/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import path                      from 'path';

const app = koa();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack/dev.config').default(app);
}

app.use(koaStatic(path.join(__dirname, 'dist')));

app.use( async ctx => {

  const location = createLocation(ctx.url);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return ctx.response.status(500).end('Internal server error');
    }

    if(!renderProps)
      return ctx.response.status(404).end('Not found');

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
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;
//<link rel="stylesheet" type="text/css" href="/public/style.css">

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => ctx.response.end(html))
      .catch(err => ctx.response.end(err.message));
  });
});

export default app;
