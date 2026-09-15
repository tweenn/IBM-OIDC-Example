const passport = require('passport');

const OIDC_BASE_URI = process.env.OIDC_CI_BASE_URI;

module.exports = (router) => {
	// Initiates an authentication request with IBM
	// The user will be redirect to IBM and once authenticated
	// they will be returned to the callback handler below
	router.get('/login', passport.authenticate('openidconnect', {
		successReturnToOrRedirect: '/',
		scope: 'email profile'
	}));

	// Callback handler that IBM will redirect back to
	// after successfully authenticating the user
	router.get('/oauth/callback', passport.authenticate('openidconnect', {
		callback: true,
		successReturnToOrRedirect: '/?loggedin=success',
		failureRedirect: '/?loggedin=failure'
	}));


	router.get('/logout', function(req, res){
		// Destroy both the local session and
		// revoke the access_token at IBM Cloud Identity
		const body = Object.entries({
			'client_id': process.env.OIDC_CLIENT_ID,
			'client_secret': process.env.OIDC_CLIENT_SECRET,
			'token': req.session.accessToken,
			'token_type_hint': 'access_token'
		})
			.map(([key, value]) => `${key}=${value}`)
			.join('&')

		fetch(`${OIDC_BASE_URI}/revoke`, {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			body
		})
			.then((response) => {
				req.session.destroy();
				console.log('Session has been revoked');
				res.redirect('/?loggedout=success');
			});
	});

	return router;
};
