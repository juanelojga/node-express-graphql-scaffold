'use strict'

import { Router } from 'express'
import { User } from './../models'
import token from './../services/token'
import * as config from './../config'

export default () => {
  let route = Router();

  route.post('/login', (req, res) => {

    const credentials = req.body;

    User.findOne({ where: { email: credentials.email } })
    .then(user => {
      const jwt = token.sign({
        sub: user.uuid,
        iss: config.jwtIssuer,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
      res.json({
        token: jwt
      });
    })
    .catch(err => {
      res.json({
        "message": "User not found",
        "code": "USER_NOT_FOUND"
      }).status(401);
    });

  });

  return route;
}
