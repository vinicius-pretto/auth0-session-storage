const express = require("express");
const auth0Provider = require("./auth0Provider");
const sessionStorage = require("./sessionStorage");
const router = express.Router();

router.get("/login", auth0Provider.authorize(), (req, res) => {
  res.redirect("/profile");
});

router.get("/callback", async (req, res, next) => {
  try {
    const user = await auth0Provider.authenticate(req, res);
    await sessionStorage.createSession(req, user);
    const returnTo = req.session.returnTo || "/profile";
    delete req.session.returnTo;
    res.redirect(returnTo);
  } catch {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  sessionStorage.destroySession(req);
  auth0Provider.destroySession(res);
});

module.exports = router;
