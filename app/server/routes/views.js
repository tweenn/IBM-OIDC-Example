const OIDC_BASE_URI = process.env.OIDC_CI_BASE_URI;

// Middleware for checking if a user has been authenticated
// via Passport and IBM OpenId Connect
const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else{
		res.redirect("/");
	}
};

module.exports = (router) => {
	router.get('/', (req, res, next) => {
		if (req.session.accessToken) {
			// Log the user profile
			res.render('users', {
				title: 'Users',
				user: req.user,
				loggedin: (req.query.loggedin === 'success')
			});
		} else {
			// If no session exists, show the index.hbs page
			res.render('index', {
				title: 'IBM Cloud Identity OpenID Connect Example',
				loggedout: (req.query.loggedout === 'success') 
			});
		}
	});

	router.get('/profile', checkAuthentication, (req, res, next) => {
		fetch(`${OIDC_BASE_URI}/userinfo`, {
			method: 'GET',
			headers: {
				authorization: `bearer ${req.session.accessToken}`,
				'content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((response) => {
				const pbody = response;
				const vbody = JSON.stringify(response, null, 2);

				res.render('profile', {
					title: 'Profile',
					user: pbody,
					fullJson: vbody
				});
			});
	});

	router.get('/introspect', checkAuthentication, (req, res, next) => {
		const body = Object.entries({
			'client_id': process.env.OIDC_CLIENT_ID,
			'client_secret': process.env.OIDC_CLIENT_SECRET,
			'token': req.session.accessToken,
			'token_type_hint': 'access_token'
		})
			.map(([key, value]) => `${key}=${value}`)
			.join('&')

		fetch(`${OIDC_BASE_URI}/introspect`, {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			body
		})
			.then((response) => response.json())
			.then((response) => {
				const pbody = response;
				const vbody = JSON.stringify(response, null, 2);

				res.render('introspect', {
					title: 'Introspect',
					atoken: req.session.accessToken,
					introspect: pbody,
					fullJson: vbody
				});
			});
	});
};
