//import babelPolyfill from "babel-polyfill";
import koa from "koa";
import koaStatic from "koa-static";
import * as history from "history";

import passport from "koa-passport";
let router = require("koa-router")();
import bodyParser from "koa-bodyparser";
import convert from "koa-convert"; // necessary until koa-session has been updated to support koa@2
import session from "koa-session";
import proxy from "koa-proxy";

//import routesContainer from "../client/routes";

import webpackMiddleware from "koa-webpack-dev-middleware";
import webpackHotMiddleware from "koa-webpack-hot-middleware";
import webpack from 'webpack';
import webpackConfig from '../../webpack/webpack.config';
import configuration from '../common/server-config';
import path from 'path';

var compiler = webpack(webpackConfig);
try {
	const app      = koa();
	const hostname = process.env.HOSTNAME || "localhost";
	const port     = process.env.PORT || 8000;
	const compiler = webpack(webpackConfig);
	const serverOptions = {
	  contentBase: 'http://' + hostname + ':' + port,
	  quiet: true,
	  noInfo: true,
	  hot: true,
	  inline: true,
	  lazy: false,
	  publicPath: webpackConfig.output.publicPath,
	  headers: {'Access-Control-Allow-Origin': '*'},
	  stats: {colors: true}
	};
	//let routes   = routesContainer;

	app.use(bodyParser());
	app.keys = ['secret'];
	app.use(session(app));

	app
		.use(passport.initialize())
		.use(passport.session());

	app.use(koaStatic("static"));

	app.use(webpackMiddleware(compiler, serverOptions));
	app.use(webpackHotMiddleware(compiler));
	//Authentication and API routes

	router.get('/auth/github', passport.authenticate('github'));
	// router.get('/auth/google', passport.authenticate('google')));
	// router.get('/auth/harvestapp', passport.authenticate('harvestapp')));

	router.get('/auth/github/callback',
	  passport.authenticate('github', {
			successRedirect: '/dashboard',
			failureRedirect: '/error'
		})
	);

	// router.get('/auth/google/callback'),
	// 	passport.authenticate('google', {
	// 		successRedirect: '/dashboard',
	// 		failureRedirect: '/error'
	// 	});
	// );
	//
	// router.get('/auth/harvestapp/callback'),
	// 	passport.authenticate('harvestapp', {
	// 		successRedirect: '/dashboard',
	// 		failureRedirect: '/error'
	// 	});
	// );
	//

	app
		.use(router.routes())
	  .use(router.allowedMethods());

	app.use(proxy({
		host: 'https://api.github.com',
		match: /^\/api\/github\//i,
		map: (path) => path.replace(/^\/api\/github\//i, "/")
	}));

	// app.use(proxy({
	// 	host: 'https://api.google.com',
	// 	match: /^\/api\/github\//i,
	// 	map: (path) => path.replace(/^\/api\/google\//i, "/")
	// }));
	//
	// app.use(proxy({
	// 	host: 'https://cantina.harvestapp.com',
	// 	match: /^\/api\/harvestapp\//i,
	// 	map: (path) => path.replace(/^\/api\/harvestapp\//i, "/")
	// }));
	// serve static files
	//app.serve_static_files('/assets', path.join(Root_folder, 'build', 'assets'))

	// Proxy all the rest requests to Webpage rendering server
	app.use(proxy({
		host: `http://${configuration.webpage_server.http.host}:${configuration.webpage_server.http.port}`
	}));
	app.listen(configuration.web_server.http.port, () => {
		console.info(`Web server is listening`)
		console.info(`Now go to http://${configuration.web_server.http.host}:${configuration.web_server.http.port}`)
	});
}
catch (error) {
	console.error(error.stack || error);
}
