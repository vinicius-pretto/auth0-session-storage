const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const config = require("../../config");

const createStrategy = () => {
  const verify = (accessToken, refreshToken, extraParams, profile, done) => {
    const payload = {
      id: profile.id,
      accessToken,
    };
    return done(null, payload);
  };
  const auth0Strategy = new Auth0Strategy(config.auth0, verify);
  return auth0Strategy;
};

const authorize = () => {
  return passport.authenticate("auth0", config.passport.auth0);
};

const authenticate = (req, res) => {
  return new Promise((resolve, reject) => {
    return passport.authenticate("auth0", (error, user, info) => {
      if (error) {
        return reject(error);
      }
      if (!user) {
        return reject("Unauthorized");
      }
      return resolve(user);
    })(req, res);
  });
};

const destroySession = (res) => {
  const returnTo = process.env.AUTH0_LOGOUT_URL;
  const logoutURL = `https://${config.auth0.domain}/v2/logout?client_id=${config.auth0.clientID}&returnTo=${returnTo}`;
  res.redirect(logoutURL);
};

module.exports = {
  createStrategy,
  authorize,
  authenticate,
  destroySession,
};
