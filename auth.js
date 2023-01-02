const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID ='858670823663-r67r6f3ketqir8jpjc9a2f88rn7ljgms.apps.googleusercontent.com' ;
const GOOGLE_CLIENT_SECRET ='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' 
;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://backendtimeline.herokuapp.com/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
