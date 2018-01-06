'use strict'

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import * as config from './config'
import models from './models'

let app = express();
app.server = http.createServer(app);

app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// internal middleware
app.use(middleware());

// api router
app.use('/api', api());


if ( process.env.NODE_ENV == "testing" ) {
	models.sync().catch(err => console.error(err.stack)).then(() => {
		app.server.listen(config.appPort, () => {
			console.log(`Started on port ${app.server.address().port}`);
		});
	});	
} else {
	app.server.listen(config.appPort, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
}


export default app;
