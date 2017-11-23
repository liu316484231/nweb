var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.end('Hello Node');
    res.render("index");
});

router.get('/upload', function(req, res, next) {
    //res.end('Hello Node');
    res.render("upload");
});

module.exports = router;
