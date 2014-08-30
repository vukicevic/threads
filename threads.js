var express   = require("express"),
    parser    = require("body-parser"),
    Filestore = require(__dirname + "/app/filestore"),
    Datastore = require(__dirname + "/app/datastore"),
    threads   = express();

global.filestore = new Filestore();
global.datastore = new Datastore(global.filestore.load());

threads.use(parser.json());

threads.use("/api", require(__dirname + "/app/controller"));
threads.use(express.static(__dirname + "/static"));

threads.listen(process.env.PORT || 3000);

/* HANDLE EXIT */
process.stdin.resume();
process.on('SIGINT', function () {
  global.filestore.save(global.datastore.export());
  process.exit();
});