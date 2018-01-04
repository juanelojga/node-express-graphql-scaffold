'use strict'

import jwt from 'jsonwebtoken'
import * as config from './../config'

/**
 * Sign a token
 * @param {*} payload 
 */
const signToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: "7d"
  });
}

/**
 * Veirfy and decode a JWT
 * @param {*} token 
 */
const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret, {
    issuer: config.jwtIssuer
  });
};

/**
 * method assignation
 */
const tokenService = {
  sign: signToken,
  verify: verifyToken
}

export default tokenService;