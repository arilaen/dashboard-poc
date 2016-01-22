import React from "react";
import InlineCss from "react-inline-css";
import passport from "koa-passport";

const fetchRepos  = (org) => {
	return githubApi.browse(
		["orgs", org, "repos"]
	).then(json => {
		return (json || []).map(({id, name, language}) => ({id, name, language}));
	}).catch(error => {
		throw error;
	});
};

const fetchGoogleInfo  = (org) => {
	return googleApi.browse(
		["orgs", org, "repos"]
	).then(json => {
		// return (json || []).map(({id, name, language}) => ({id, name, language}));
	}).catch(error => {
		throw error;
	});
};

/**
 * Main React application entry-point for both the server and client.
 */
class Main extends React.Component {
	/**
	 * componentWillMount() runs on server and client.
	 */
	componentWillMount () {
		if (__SERVER__) {
			console.log("Hello server");
		}

		if (__CLIENT__) {
			console.log("Hello client");
		}
	}

	/**
	 * componentDidUpdate() only runs on the client.
	 */
	componentDidUpdate (prevProps, prevState) {
		if (!this.props.additionalRepos) {
			return;
		}

		this.loadMoreReposOnClient();
	}

	/**
	 * Load more repos
	 */
	loadMoreReposOnClient () {
		// const {additionalRepos = [], transmit} = this.props;
		// let {nextPage, pagesToFetch} = transmit.variables;
		//
		// if (--pagesToFetch <= 0) {
		// 	return;
		// }
		//
		// ++nextPage;
		//
		// transmit.forceFetch({
		// 	nextPage,
		// 	pagesToFetch,
		// 	additionalRepos
		// }, "additionalRepos");
	}

	/**
	 * Runs on server and client.
	 */
	render () {
		const repositoryUrl = "https://github.com/arilaen/dashboard-poc.git";

		/**
		 * This is a Transmit fragment.
		 */
		let {repos, additionalRepos} = this.props;

		if (additionalRepos) {
			repos = repos.concat(additionalRepos);
		}

		return (
			<InlineCss stylesheet={Main.css} namespace="Main">
				<h1>
					Cantina Dashboard
				</h1>
				<p>
					Visualize Cantina projects, languages and skills over time.
				</p>
			</InlineCss>
		);
	}
	/**
	 * <InlineCss> component allows you to write a CSS stylesheet for your component. Target
	 * your component with `&` and its children with `& selectors`. Be specific.
	 */
	static css () {
		return (`
			& {
				font-family: sans-serif;
				color: #0df;
				padding: 10px 30px 30px;
				width: 443px;
				margin: 10px auto;
				background: #222;
			}
		`);
	}
}
