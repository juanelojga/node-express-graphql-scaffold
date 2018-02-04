import passport from 'passport'
import HttpException from './../exceptions/httpException'

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return next(new HttpException('Authentication Exception', 'UNAUTHENTICATED', 401))
    }
    req.user = user;
    return next(null, user)
  })(req, res, next)
}

export default authenticate
