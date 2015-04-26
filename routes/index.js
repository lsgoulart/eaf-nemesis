var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', function(req, res) {
  res.render('index', { title: 'Nemesis Seed' });
});

module.exports = router;
