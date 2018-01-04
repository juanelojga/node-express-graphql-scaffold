'use strict'

import expect from 'expect'
import token from './../../src/services/token'
import jwt from 'jsonwebtoken';
import * as config from './../../src/config';

describe('Token Service', () => {
  it('Should generate a token for a user', (done) => {
    const User = {
      sub: 34,
      iss: "https://api.nodejs.co",
      first_name: "Jose",
      last_name: "Fonseca",
      email: "jose@example.com"
    }
    const JWT = token.sign(User);
    expect(JWT).toBeA('string');
    const decoded = jwt.verify(JWT, config.jwtSecret, {
      issuer: "https://api.nodejs.co"
    });
    expect(decoded.first_name).toEqual("Jose");
    expect(decoded.last_name).toEqual("Fonseca");
    expect(decoded.email).toEqual("jose@example.com");
    done();
  });

  it('Should verify a JWT', (done) => {
    const User = {
      sub: 34,
      iss: "https://api.nodejs.co",
      first_name: "Jose",
      last_name: "Fonseca",
      email: "jose@example.com"
    }
    const JWT = jwt.sign(User, config.jwtSecret, {
      expiresIn: "7d"
    });
    const decoded = token.verify(JWT);
    expect(decoded.first_name).toEqual("Jose");
    expect(decoded.last_name).toEqual("Fonseca");
    expect(decoded.email).toEqual("jose@example.com");
    done();
  });
  
});