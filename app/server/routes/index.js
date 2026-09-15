module.exports = (app) => {
	require('./views')(app);
	require('./auth')(app);
	return app;
};
