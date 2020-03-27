const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const { googleClientID, googleClientSecret } = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
    done(null, user.id)
});
passport.deserializeUser( async (id, done) => {
   const user = await User.findById(id);
   done(null, user)
});

passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, { id }, done) => {
            const existingUser = await User.findOne({ googleId: id });

            if (existingUser) {
                done(null, existingUser);
            } else {
                const user = await new User({
                    googleId: id
                });
                await user.save();
                done(null, user)
            }

        }
    )
);