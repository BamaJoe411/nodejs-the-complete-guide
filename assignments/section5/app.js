const express = require('express');

const app = express();

const html = require('./html');

app.use('/', (req, res, next) => {
	next();
});


app.use('/users', (req, res, next) => {
	const html_respose = html.users();
	res.send(html_respose);
});

app.use('/', (req, res, next) => {
	const html_respose = html.root();
	res.send(html_respose);
});

app.listen(3000);
