import express from "express";
var GoogleStrategy = require('passport-google-oidc');
import { GooglePassport } from "../passport/google-strategy-passport";
export const AuthGoogleRouter = express.Router();
import passport from "passport";
GooglePassport(passport, GoogleStrategy.Strategy);
AuthGoogleRouter.get('/', passport.authenticate('google', { scope: ["profile", "email"] }));


// AuthGoogleRouter.post('/auth/google/refresh-token', async (req, res) => {
//   const user = new UserRefreshClient(
//     clientId,
//     clientSecret,
//     req.body.refreshToken,
//   );
//   const { credentials } = await user.refreshAccessToken(); // optain new tokens
//   res.json(credentials);
// })

module.exports = AuthGoogleRouter;