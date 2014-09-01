var express   = require("express"),
    parser    = require("body-parser"),
    Datastore = require(__dirname + "/app/datastore"),
    threads   = express();

global.datastore = new Datastore("threads");

threads.use(parser.json({limit: "5mb"}));

threads.use("/api", require(__dirname + "/app/controller"));
threads.use(express.static(__dirname + "/static"));

threads.listen(process.env.PORT || 3000);

/* HANDLE EXIT */
process.stdin.resume();
process.on('SIGINT', function () {
  global.datastore.export();
  process.exit();
});