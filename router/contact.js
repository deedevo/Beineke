const express = require("express");
const router = express.Router();
let path = require('path')
router
    .route("/")
    .get((req, res) => res.render(path.resolve('public/views/contact.ejs')))
module.exports = router;