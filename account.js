var express = require('express');
var router = express.Router();

router.get('/account', function (req, res) {
  res.send({"name": "Emily", "email": "mcmullae@oregonstate.edu", "address": "123 Arbor Loop"});
})

module.exports = router;
