import express from 'express';

const router = express.Router();

/* GET index listing. */
router.get('/', function(req, res) {
  res.json('Main Page');
});

export default router;