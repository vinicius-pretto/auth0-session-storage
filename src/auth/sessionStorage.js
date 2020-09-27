const passport = require("passport");

const initialize = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

const createSession = (req, payload) => {
  return new Promise((resolve, reject) => {
    return req.logIn(payload, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

const destroySession = (req) => {
  req.logOut();
};

module.exports = {
  initialize,
  isAuthenticated,
  createSession,
  destroySession,
};
