var express = require('express');
var router = express.Router();
var adminObj = require("../controllers/contacts");

router.get("/admin", adminObj.show);
module.exports = router;