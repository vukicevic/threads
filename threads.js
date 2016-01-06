var express = require("express");
var parser  = require("body-parser");
var morgan  = require("morgan")

var control = require(__dirname + "/app/controller");
var app     = express();

app.use(parser.json());
app.use(morgan('dev'));

app.use("/api", control);
app.use(express.static("static"));

app.listen(process.env.PORT || 3000);