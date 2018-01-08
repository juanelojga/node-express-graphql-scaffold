
import Login from './../controllers/auth/login'
import Ping from './../controllers/ping'
import GetUsers from './../controllers/users/getUsers'
import authenticate from './../passport/authenticate'

export default (router) => {
	
	router.get('/ping', new Ping);

	router.group('/auth', (router) => {
		router.post('/login', new Login);
	});

	router.group({middleware: [authenticate]}, (router) => {
		router.get('/users', new GetUsers);
	});

	return router;
}
