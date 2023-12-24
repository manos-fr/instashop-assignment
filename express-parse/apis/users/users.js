const router = require('express').Router();

const { logIn, logOut } = require('../../functions/functions');

router.post('/login', async (req, res) => {
  await logIn(req, res);
});

router.get('/logout', async (req, res) => {
  await logOut(req, res);
});

module.exports = router;
