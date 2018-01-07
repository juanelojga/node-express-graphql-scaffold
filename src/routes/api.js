
import Login from './../controllers/auth/login'
import Ping from './../controllers/ping'

export default (router) => {
	
	router.get('/ping', new Ping);

	router.group('/auth', (router) => {
		router.post('/login', new Login);
	});

	return router;
}
