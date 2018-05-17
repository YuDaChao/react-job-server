const express = require('express');
const router = express.Router();

const User = require('../proxy').User;


/* GET home page. */
router.get('/', function(req, res, next) {
  User.newAndSave("yudachao", '123456', 1, '', function (err, user) {
    console.log(err, user)
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
