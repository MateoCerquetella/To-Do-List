const User = require('./user.controller');
const router = require('express').Router();

module.exports = (app) => {
  router.post('/', User.register);
  router.post('/login', User.login);

  app.use('/auth', router);
}