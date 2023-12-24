const router = require('express').Router();

const { getSights, getSightById, updateSight } = require('../../functions/functions');

router.get('/', async (req, res) => {
  await getSights(req, res);
});

router.get('/:id', async (req, res) => {
  await getSightById(req, res);
});

router.put('/:id', async (req, res) => {
  await updateSight(req, res);
});

module.exports = router;
