const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const { googleClientID, googleClientSecret } = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
    done(null, user.id)
});
passport.deserializeUser( (id, done) => {
   User.findById(id).then( user => {
       done(null, user)
   });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, { id }, done) => {
            User.findOne({ googleId: id })
                .then(user => {
               if (user) {
                   done(null, user);
               } else {
                   new User({
                       googleId: id
                   }).save().then( (user) => {
                       done(null, user)
                   })
               }
            })
        }
    )
);