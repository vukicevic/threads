var express = require("express"),
    parser  = require("body-parser");
    app     = express(),
    port    = process.env.PORT || 3000,

app.use(parser.json());
app.use("/api", require("./app/controller"));
app.use(express.static(__dirname + "/static"));

app.listen(port);