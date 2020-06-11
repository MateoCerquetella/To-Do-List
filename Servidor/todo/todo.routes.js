const ToDo = require('./todo.controller');
const middleware = require('../auth/middelware.js');
const router = require('express').Router();

module.exports = (app) => {
  router.post('/', middleware.ensureAuthenticated, ToDo.create);
  router.get('/', middleware.ensureAuthenticated, ToDo.read);
  router.put('/:id', middleware.ensureAuthenticated, ToDo.update);
  router.delete('/:id', middleware.ensureAuthenticated, ToDo.delete);

  app.use('/todo', router);
}