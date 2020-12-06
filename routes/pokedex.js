const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/pokedex');
});

module.exports = router;
