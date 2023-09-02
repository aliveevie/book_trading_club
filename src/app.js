const express = require('express');
const app = express();
const { Pool } = require('pg');
const dotevn = require('dotenv');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');


dotevn.config();
const db = require('../Database/database');

passport.use(new GitHubStrategy({
  clientID: '5207ce0e90ef2748678c',
  clientSecret: '96547885d5bf0c9e60e4ca172995a0417c935c8e',
  callbackURL: "http://localhost:3000/auth/github/callback"
},
async function(accessToken, refreshToken, profile, done) {
  // This function will be called when a user is authenticated
  // You can save user data to your database or perform other actions here
    const { displayName, username} = profile;
    const location = profile._json.location

     const queryResult = await db.query(
      'SELECT username FROM users WHERE username = $1',
      [username]
    );

    if (queryResult.rows.length > 0) {
      const user = queryResult.rows[0];
      app.get('/user', (req, res) => {
        res.json({username: username});
      });
      
    } else {
      const insertUser =  await db.query('INSERT INTO users(username, fullname, location) VALUES($1, $2, $3)',
      [username, displayName, location]
      );
    };
  
  return done(null, profile);
}));




app.use(session({
  secret: '154', // Replace with your actual secret key
  resave: false,
  saveUninitialized: true
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile('index.html', { root : 'public' })
});

app.get('/auth/github',
  passport.authenticate('github'));

// Callback route after GitHub authentication
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect to a success page
    res.redirect('http://localhost:3000/');
  });





module.exports = app;