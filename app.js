const express = require("express");
const app = express();
const router = require("./ctrl/router");
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'src/build')));
app.use("/", router);



module.exports = app;