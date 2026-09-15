// Use Passport with OpenId Connect strategy to
// Authenticate users with IBM Cloud Identity Connect
const passport = require('passport');
const OpenIDStrategy = require('passport-openidconnect').Strategy;

// edit this URL with your base URL for IBM Cloud Identity OIDC default endpoint
const OIDC_BASE_URI = process.env.OIDC_CI_BASE_URI;

// Configure the OpenId Connect Strategy
// with credentials obtained from env details (.env)
passport.use(new OpenIDStrategy({
	issuer: OIDC_BASE_URI,
	clientID: process.env.OIDC_CLIENT_ID, // from .env file
	clientSecret: process.env.OIDC_CLIENT_SECRET, // from .env file
	authorizationURL: `${OIDC_BASE_URI}/authorize`, // this won't change
	userInfoURL: `${OIDC_BASE_URI}/userinfo`, // this won't change
	tokenURL: `${OIDC_BASE_URI}/token`, // this won't change
	callbackURL: process.env.OIDC_REDIRECT_URI, // from .env file
	passReqToCallback: true
},
(req, issuer, userId, profile, accessToken, refreshToken, params, cb) => {
	// Log the session in the console.
	// console.log('issuer:', issuer);
	// console.log('userId:', userId);
	// console.log('accessToken:', accessToken);
	// console.log('refreshToken:', refreshToken);
	// console.log('params:', params);
	req.session.accessToken = accessToken;

	return cb(null, profile);
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

module.exports = (app) => {
	// Initialize Passport
	app.use(passport.initialize());
	app.use(passport.session());
};
