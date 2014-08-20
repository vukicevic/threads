var express = require("express"),
    parser  = require("body-parser"),
    fstore 	= require(__dirname + "/app/filestore"),
    dstore 	= require(__dirname + "/app/datastore"),
    app     = express();

global.filestore = new fstore();
global.datastore = new dstore(global.filestore.load());

app.use(parser.json({limit: "5mb"}));

app.use("/api", require(__dirname + "/app/controller"));
app.use(express.static(__dirname + "/static"));

app.listen(process.env.PORT || 3000);

/* HANDLE EXIT */
process.stdin.resume();
process.on('SIGINT', function () {
  global.filestore.save(global.datastore.export());
  process.exit();
});