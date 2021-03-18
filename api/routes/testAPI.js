var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get('/:tagId', function(req, res) {
    res.send('the tagId is: ' + req.params.tagId);
})

module.exports = router;