
import { User } from './../../models';
import token from './../../services/token';
import * as config from './../../config';
import Promise from 'bluebird';
import httpException from '../../exceptions/httpException';
import validationException from '../../exceptions/validationException';
import validate from 'validate.js';

/**
 * Login a User
 */
class Login {

  /**
   * Handle the incoming request
   * @param {*} req Express Request Object
   * @param {*} res Express Response Object
   * @param {*} next Express next function
   */
  handle(req, res, next) {
    const credentials = req.body;

    var constraints = {
      email: {
        presence: true,
        email: true
      },
      password: {
        presence: true
      }
    };

    const errors = validate(credentials, constraints);
    
    if (errors !== undefined) {
      let err = new validationException('Incomplete or invalid request data', 'VALIDATION_EXCEPTION', errors);
      next(err);
      return null;
    }

    User.findOne({ where: { email: credentials.email } })
    .then(user => {
      if (!user) {
        let ErrorUserNotFound = new httpException('User not found', 'USER_NOT_FOUND', 401);
        return Promise.reject(ErrorUserNotFound);
      }
      return [
        user,
        user.verifyPassword(credentials.password)
      ];
    })
    .spread((user, result) => {
      if (!result) {
        let ErrorPassword = new httpException('Wrong credentials', 'LOGIN_FAILED', 401);
        return Promise.reject(ErrorPassword);
      }
      return Promise.resolve(user);  
    })
    .then(user => {
      const jwt = token.sign({
        sub: user.uuid,
        iss: config.jwtIssuer,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
      res.json({
        access_token: jwt.access_token,
        ttl: jwt.ttl
      });
    })
    .catch(err => {
      next(err);
    });
  }

}

export default Login;