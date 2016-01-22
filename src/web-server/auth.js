import passport from "koa-passport";
//import { OAuthStrategy as GoogleStrategy } from "passport-google-oauth";
 import { Strategy as GithubStrategy } from "passport-github2";
// import { Strategy as OAuth2Strategy } from "passport-oauth2";
const {protocol, hostname, port} = window.location;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `${protocol}//${hostname}:${port}/auth/github/callback`
  },
  function(token, refreshToken, profile, done) {
    this.githubToken = token;
    return done(null, profile);
  }
));

// //https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
// passport.use(new GoogleStrategy({
//     consumerKey: GOOGLE_CONSUMER_KEY,
//     consumerSecret: GOOGLE_CONSUMER_SECRET,
//     callbackURL: `${protocol}//${hostname}:${port}/auth/google/callback`
//   },
//   function(token, tokenSecret, profile, done) {
//     this.googleToken = token;
//     return done(null, profile);
//   }
// );
//
// //NEED HARVEST API KEY TO TEST THIS
// //See https://github.com/harvesthq/harvest_api_samples/blob/master/oauth/harvest_api_oauth_sample.rb
// passport.use('harvestapp', new OAuth2Strategy({
//     authorizationURL: 'https://cantina.harvestapp.com/oauth2/authorize',
//     tokenUrl: 'https://cantina.harvestapp.com/oauth2/access_token',
//     clientId: HARVEST_CLIENT_ID,
//     callbackUrl: `${protocol}//${hostname}:${port}/auth/harvestapp/callback`
//   },
//   function(token, tokenSecret, profile, done) {
//     this.harvestToken = token;
//     done(null, profile);
//   }
// );

module.exports = passport;
