var express = require("express"),
    router  = express.Router(),
    store   = require(__dirname + "/datastore"),
    Post    = require(__dirname + "/model");

router.route("/thread/:id/:offset?/:limit?")

  .post(function(req, res) {
    if (req.body.text) {
      res.status(201).json(store.set(new Post(req.ip, req.body.author, req.body.title, req.body.text, parseInt(req.params.id), req.body.image))).end();
      store.update(parseInt(req.params.id));
    } else {
      res.status(400).end();
    }
  })

  .get(function(req, res) {
    res.status(200).json({ 
      "thread": store.get(req.params.id, req.params.offset, req.params.limit)
    }).end();
  });

module.exports = router;