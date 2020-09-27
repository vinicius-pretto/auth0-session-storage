const express = require("express");
const passport = require("passport");
const path = require("path");
const expressSession = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(expressSession);
const auth0Provider = require("./auth/auth0Provider");
const sessionStorage = require("./auth/sessionStorage");
const config = require("../config");
const authRouter = require("./auth/authRouter");

const app = express();
const auth0Strategy = auth0Provider.createStrategy();
const redisClient = redis.createClient();
const sessionConfig = {
  ...config.session,
  store: new RedisStore({ client: redisClient }),
};

app.use(express.static(config.staticFolder, config.staticOptions));
app.use(expressSession(sessionConfig));
passport.use(auth0Strategy);
app.use(passport.initialize());
app.use(passport.session());
sessionStorage.initialize();
app.use(authRouter);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/profile", sessionStorage.isAuthenticated, (req, res) => {
  res.sendFile(path.resolve("public/profile.html"));
});

module.exports = app;
