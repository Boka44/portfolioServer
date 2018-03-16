const express = require('express');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const app = express();

const portfolio = require('./routes/portfolio');
const barjoker = require('./routes/barjoker');

app.use('/', portfolio);
app.use('/barjoker', barjoker);

app.listen(PORT, function () {
	console.log('Express server is running on port ' + PORT);
}).on('error', err => console.error(err));