const express = require('express');
const passport = require('passport');
const router = express.Router();
const gitController = require('../controllers');
const gitMiddleware = require('../middlewares');

router.get('/search', gitMiddleware.isLogIn, gitController.getData);
router.get('/',gitController.getIndexPage);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/google/failed' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/google/success');
    delete req.session.returnTo;
  });
router.get('/google/failed', (req, res) => {
  res.send(`<h1>You failed to log in</h1>`);
});
router.get('/google/success', gitController.getHomePage);

module.exports = router;