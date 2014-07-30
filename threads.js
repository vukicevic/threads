var express = require("express"),
    parser  = require("body-parser"),
    app     = express();

app.use(parser.json());

app.use("/api", require("./app/controller"));
app.use(express.static(__dirname + "/static"));

app.listen(process.env.PORT || 3000);