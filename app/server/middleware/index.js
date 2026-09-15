module.exports = (app) => {
	require('./cookie-parser')(app);
	require('./engine')(app);
	require('./body-parser')(app);
	require('./session')(app);
	require('./passport')(app);
};
