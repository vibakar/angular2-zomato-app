const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../users/userEntity');
const connectFlash = require('connect-flash');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },function(email, password, cb) {
   Users.findOne({"email": email}, function(err, user)
   {
     if (err) { return cb(err); }
     if (!user) {return cb(null, false); }
     if (user.password != password) {return cb(null, false); }
     return cb(null, user);
   });
 }));

passport.serializeUser(function(user, done) {
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {
 Users.findById(id, function(err, user) {
   done(err, user);
 });
});

module.exports = passport;
