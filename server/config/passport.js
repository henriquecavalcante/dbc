const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const config = require('./config');

const jwtAuth= new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  async (payload, done) => {
     return done(null, true);
  }
);

passport.use(jwtAuth);

module.exports = passport;
