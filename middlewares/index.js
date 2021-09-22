const isLogIn = (req, res, next) => {
    if (req.user) next();
    else {
      req.session.returnTo = req.originalUrl;
      res.redirect('/google');
    }
  };

  module.exports = {
      isLogIn
  }