const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongoURI, cookieKey } = require('./config/keys');
require('./models/User');
require('./services/passport');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } );

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(port, () => {
    console.log(`Server is up on ${port} port`);
});
