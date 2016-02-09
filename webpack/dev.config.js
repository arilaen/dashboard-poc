import webpack              from 'webpack';
import assign               from 'object-assign';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import prodConfig              from './prod.config.js';

Object.assign = assign;

const BABEL_QUERY = {
  presets: ['react', 'es2015'],
  plugins: [
    ['transform-object-rest-spread'],
    ['transform-class-properties'],
    ['transform-decorators-legacy'],
    [
      'react-transform',
      {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports:    ['react'],
            locals:     ['module']
          }
        ]
      }
    ]
  ]
}

export default function(app) {
  const config = Object.assign(prodConfig, {
    devtool: 'inline-source-map',
    entry:   [
      'webpack-hot-middleware/client',
      prodConfig.entry
    ],
    module: {
      loaders: [
        {
          test:    /\.jsx?$/,
          exclude: /node_modules/,
          loader:  'babel',
          query:   BABEL_QUERY
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true }));
  app.use(webpackHotMiddleware(compiler));
}
