'use strict'

import { Router } from 'express';
import { User } from './../models';
import token from './../services/token';
import * as config from './../config';
import Promise from 'bluebird';

export default () => {
  let route = Router();

  route.post('/login', (req, res) => {

    const credentials = req.body;

    User.findOne({ where: { email: credentials.email } })
    .then(user => {
      if (!user) {
        let ErrorUserNotFound = new Error;
        ErrorUserNotFound.status = 401;
        ErrorUserNotFound.title = 'User not found';
        ErrorUserNotFound.code = 'USER_NOT_FOUND';
        return Promise.reject(ErrorUserNotFound);
      }
      return [
        user,
        user.verifyPassword(credentials.password)
      ];
    })
    .spread((user, result) => {
      if (!result) {
        let ErrorPassword = new Error;
        ErrorPassword.status = 401;
        ErrorPassword.title = 'Wrong credentials';
        ErrorPassword.code = 'LOGIN_FAILED';
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
      res.status(err.status).json({
        title: err.title,
        status: err.status,
        code: err.code
      });
    });

  });

  return route;
}
