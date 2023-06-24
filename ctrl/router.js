const express = require("express");
const router = express.Router();
const path = require('path');
const ctrl = require("./ctrl");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'src/build/index.html'));
});

router.post("/send", ctrl.send);

router.post("/download", ctrl.download);

module.exports = router;
