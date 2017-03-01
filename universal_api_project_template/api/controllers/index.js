// Router Dependencies
var express = require('express');
var router = express.Router();

// Endpoints, Require Controllers ----------------

// Example:
// router.use('/post', require('./post'))

// Base Path /api->
router.get('/', function(req, res) {
  res.json({ message: 'Qelody API...' });
});

// Routes
// Example: router.use('/user', require('./user'));


// -----------------------------------------------

module.exports = router;
