const path = require("path");

const config = {};

// Application port
config.port = process.env.PORT || 3000;

// Static middleware
config.staticFolder = path.resolve("public");
config.staticOptions = {
  index: false,
};

// Express session
config.session = {
  name: "sessionID",
  secret: "MySecr3t",
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 60 * 60 * 1000,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
};

// Auth0
config.auth0 = {
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL,
};

// Passport Auth0
config.passport = {
  auth0: {
    scope: "openid",
  },
};

// Redis
config.redis = {
  host: "localhost",
  port: 6379,
};

// Redis Store
config.redisStore = {
  prefix: "session:",
};

module.exports = config;
