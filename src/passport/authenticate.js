import passport from 'passport';
import httpException from './../exceptions/httpException'

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) { 
      return next(err); 
    }
    if (!user) {
      return next(new httpException('Authentication Exception', 'UNAUTHENTICATED', 401));
    }
    return next(null, user);
  })(req, res, next);
}

export default authenticate;