'use strict'

import { version } from '../../package.json';
import { Router } from 'express';
import login from './login'

export default () => {
	let api = Router();
	
	api.get('/', (req, res) => {
		res.json({
			"version": version,
			"status": "online",
			"date": new Date
		});
	});

	api.use(login());

	return api;
}
