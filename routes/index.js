var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index");
});

router.get('/tool', function(req, res, next) {
    res.render("tool");
});

router.get('/upload', function(req, res, next) {
    res.render("upload");
});

router.get('/check', function(req, res, next) {
    res.render("checkCSRF");
});


module.exports = router;
