

const passport = require('passport');
const UserProfile= require('../models/userProfileModel')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://backendtimeline.herokuapp.com/userprofile/logingooglesucces",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
 UserProfile.findOrCreate({googleId:profile.id},function(err, user) {
  return done(err, user)
 })
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
