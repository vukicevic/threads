var router = require("express").Router(),
    Post   = require(__dirname + "/model");

router.route("/thread/:id/:offset?/:limit?")

  .post(function(req, res) {
    if (req.body.text) {
      res.status(201).json(global.datastore.set(new Post(parseInt(req.params.id), req.body.title, req.body.text, req.body.author, req.body.secret, req.body.file))).end();
      global.datastore.update(parseInt(req.params.id));
    } else {
      res.status(400).end();
    }
  })

  .get(function(req, res) {
    res.status(200).json({ 
      "thread": global.datastore.get(req.params.id, req.params.offset, req.params.limit)
    }).end();
  });

module.exports = router;