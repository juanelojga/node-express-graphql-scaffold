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
  User.findOne({ where: { id: payload.sub } })
  .then(user => {
    return next(null, user);
  })
  .catch(err => {
    return next(err, false);
  })
});

export default strategy;