import passportJWT from 'passport-jwt';
import * as config from './../config/index';
import { User } from './../models'

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;
opts.issuer = config.jwtIssuer;

const strategy = new JwtStrategy(opts, (payload, next) => {
  return User.findOne({ where: { id: payload.sub } })
  .then(user => {
    next(null, user);
    return null;
  })
  .catch(err => {
    next(err, false);
    return null;
  })
});

export default strategy;