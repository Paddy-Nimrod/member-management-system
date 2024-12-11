function auth(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    return res.redirect("/login");
  }
}

module.exports = auth;
