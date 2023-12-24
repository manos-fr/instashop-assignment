const router = require('express').Router();

const sightsRouter = require('./sights/sights');
const usersRouter = require('./users/users');

router.use('/sights', sightsRouter);

router.use('/users', usersRouter);

module.exports = {
  router,
};
