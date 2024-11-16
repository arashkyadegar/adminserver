export const GooglePassport = (passport: any, strategy: any) => {
  // const userBus=new UserBusConc(new UserDalConc());
  var GoogleStrategy = require('passport-google-oauth20').Strategy;

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/dashboard'
  }, function (accessToken, refreshToken, profile, cb) {
    console.log('ok');
    cb(null,profile)
  }));
}