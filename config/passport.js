const passport =require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = require('../models/user')
const key = require('../config/config')


const  options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key.secret    || process.env.secret;


module.exports = passport => {
    passport.use(
      new JwtStrategy(options, (jwt_payload, done) => {
        Users.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })
    );
  };
  





