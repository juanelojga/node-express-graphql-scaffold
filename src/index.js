import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config'

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// internal middleware
app.use(middleware());

// api router
app.use('/api', api());

app.server.listen(process.env.PORT || 3001, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
