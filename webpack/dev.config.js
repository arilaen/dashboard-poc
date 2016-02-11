import webpack from 'webpack';
import assign from 'object-assign';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import prodConfig from './prod.config.js';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
    entries:   [
      'webpack-hot-middleware/client',
      './client'
    ],
    plugins: [
      new ExtractTextPlugin('style.css', {
        allChunks: true
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        {
          test:    /\.jsx?$/,
          exclude: /node_modules/,
          loader:  'babel',
          query:   BABEL_QUERY
        },
        {
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        },
        {
          test: /\.json$/,
          loader: "json-loader",
          exclude: /node_modules/
        }
      ]
    }
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true }));
  app.use(webpackHotMiddleware(compiler));
}
