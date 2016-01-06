var express = require("express");
var router  = express.Router();

var store   = require(__dirname + "/datastore");
var Post    = require(__dirname + "/model");

var create = function (req, res) {
  if (req.body.text) {
    res.status(201).json(store.set(new Post(req.ip, req.body.title, req.body.text, parseInt(req.params.id)))).end();
    store.update(parseInt(req.params.id));
  } else {
    res.status(400).end();
  }
};

var read = function (req, res) {
  res.status(200).json({
    "thread": store.get(req.params.id, req.params.offset, req.params.limit)
  }).end();
};

router.route("/thread/:id/:offset?/:limit?")
  .post(create)
  .get(read);

module.exports = router;