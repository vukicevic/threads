var express = require("express"),
    parser  = require("body-parser"),
    app     = express();

global.datastore = require(__dirname + "/app/datastore");
global.filestore = require(__dirname + "/app/filestore");

app.use(parser.json({limit: "5mb"}));

app.use("/api", require(__dirname + "/app/controller"));
app.use(express.static(__dirname + "/static"));

app.listen(process.env.PORT || 3000);